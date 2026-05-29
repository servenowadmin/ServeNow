import os
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import stripe
from datetime import datetime
from bson import ObjectId
import bcrypt
import jwt

app = FastAPI(title="Serve Now API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client.servenow

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key")
PLATFORM_COMMISSION = 0.20

# --- MODELS ---
class UserRegister(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    phone: str
    password: str
    zip: str
    city: str
    role: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Job(BaseModel):
    title: str
    category: str
    description: str
    zip: str
    city: str
    budget: float
    budgetType: str = "fixed"
    urgency: str = "normal"
    scheduledDate: Optional[str] = None
    scheduledTime: Optional[str] = None
    customerEmail: EmailStr

class Bid(BaseModel):
    jobId: str
    providerEmail: EmailStr
    providerName: str
    amount: float
    note: str

class DisputeRequest(BaseModel):
    jobId: str
    reason: str
    submittedBy: str

class SuspendUser(BaseModel):
    email: str

# --- HELPERS ---
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())

def create_token(email: str, role: str) -> str:
    return jwt.encode({"email": email, "role": role}, JWT_SECRET, algorithm="HS256")

def fix_id(doc):
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

# --- AUTH ---
@app.post("/api/auth/register")
async def register(user: UserRegister):
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered.")
    hashed = hash_password(user.password)
    new_user = {
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "phone": user.phone,
        "zip": user.zip,
        "city": user.city,
        "role": user.role,
        "password": hashed,
        "status": "active",
        "verified": False,
        "tier": "basic",
        "rating": 0,
        "completedJobs": 0,
        "createdAt": datetime.utcnow().isoformat(),
    }
    await db.users.insert_one(new_user)
    token = create_token(user.email, user.role)
    return {"token": token, "role": user.role, "email": user.email}

@app.post("/api/auth/login")
async def login(data: UserLogin):
    user = await db.users.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    if user.get("status") == "suspended":
        raise HTTPException(status_code=403, detail="Account suspended. One-strike policy enforced.")
    token = create_token(data.email, user["role"])
    return {"token": token, "role": user["role"], "email": data.email, "firstName": user["firstName"]}

# --- JOBS ---
@app.post("/api/jobs")
async def post_job(job: Job):
    new_job = job.dict()
    new_job["status"] = "open"
    new_job["bids"] = []
    new_job["createdAt"] = datetime.utcnow().isoformat()
    new_job["escrowFunded"] = False
    new_job["arrivalPhoto"] = None
    new_job["completionPhotos"] = []
    result = await db.jobs.insert_one(new_job)
    return {"id": str(result.inserted_id), "message": "Job posted successfully!"}

@app.get("/api/jobs")
async def list_jobs(zip: Optional[str] = None, category: Optional[str] = None):
    query = {"status": "open"}
    if zip:
        query["zip"] = zip
    if category and category != "All Categories":
        query["category"] = category
    jobs = await db.jobs.find(query).to_list(100)
    return [fix_id(j) for j in jobs]

@app.get("/api/jobs/{job_id}")
async def get_job(job_id: str):
    job = await db.jobs.find_one({"_id": ObjectId(job_id)})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found.")
    return fix_id(job)

@app.get("/api/jobs/customer/{email}")
async def get_customer_jobs(email: str):
    jobs = await db.jobs.find({"customerEmail": email}).to_list(100)
    return [fix_id(j) for j in jobs]

# --- BIDS ---
@app.post("/api/bids")
async def submit_bid(bid: Bid):
    job = await db.jobs.find_one({"_id": ObjectId(bid.jobId)})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found.")
    new_bid = {
        "jobId": bid.jobId,
        "providerEmail": bid.providerEmail,
        "providerName": bid.providerName,
        "amount": bid.amount,
        "note": bid.note,
        "status": "pending",
        "submittedAt": datetime.utcnow().isoformat(),
    }
    await db.bids.insert_one(new_bid)
    await db.jobs.update_one({"_id": ObjectId(bid.jobId)}, {"$inc": {"bidCount": 1}})
    return {"message": "Bid submitted successfully!"}

@app.get("/api/bids/job/{job_id}")
async def get_bids_for_job(job_id: str):
    bids = await db.bids.find({"jobId": job_id}).to_list(50)
    return [fix_id(b) for b in bids]

@app.get("/api/bids/provider/{email}")
async def get_provider_bids(email: str):
    bids = await db.bids.find({"providerEmail": email}).to_list(50)
    return [fix_id(b) for b in bids]

@app.post("/api/bids/{bid_id}/accept")
async def accept_bid(bid_id: str):
    bid = await db.bids.find_one({"_id": ObjectId(bid_id)})
    if not bid:
        raise HTTPException(status_code=404, detail="Bid not found.")
    await db.bids.update_one({"_id": ObjectId(bid_id)}, {"$set": {"status": "accepted"}})
    await db.jobs.update_one(
        {"_id": ObjectId(bid["jobId"])},
        {"$set": {"status": "in_progress", "assignedProvider": bid["providerEmail"], "assignedProviderName": bid["providerName"]}}
    )
    return {"message": "Bid accepted! Job is now in progress."}

# --- ESCROW & PAYMENTS ---
@app.post("/api/payments/create-escrow")
async def create_escrow(amount: float, job_id: str):
    commission = int(amount * PLATFORM_COMMISSION * 100)
    try:
        intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),
            currency="usd",
            application_fee_amount=commission,
            metadata={"job_id": job_id}
        )
        await db.jobs.update_one({"_id": ObjectId(job_id)}, {"$set": {"escrowFunded": True, "escrowIntentId": intent.id}})
        return {"client_secret": intent.client_secret}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/payments/release/{job_id}")
async def release_payment(job_id: str):
    job = await db.jobs.find_one({"_id": ObjectId(job_id)})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found.")
    await db.jobs.update_one(
        {"_id": ObjectId(job_id)},
        {"$set": {"status": "completed", "completedAt": datetime.utcnow().isoformat(), "paymentReleased": True}}
    )
    provider_email = job.get("assignedProvider")
    if provider_email:
        await db.users.update_one({"email": provider_email}, {"$inc": {"completedJobs": 1, "totalEarned": job["budget"] * 0.80}})
    return {"message": "Payment released to provider!"}

# --- PROOF SYSTEM ---
@app.post("/api/jobs/{job_id}/arrival")
async def submit_arrival(job_id: str, photo_url: str, lat: float = 0, lng: float = 0):
    await db.jobs.update_one(
        {"_id": ObjectId(job_id)},
        {"$set": {
            "arrivalPhoto": photo_url,
            "arrivalTime": datetime.utcnow().isoformat(),
            "arrivalLat": lat,
            "arrivalLng": lng,
        }}
    )
    return {"message": "Arrival confirmed!"}

@app.post("/api/jobs/{job_id}/completion")
async def submit_completion(job_id: str, photo_urls: List[str]):
    await db.jobs.update_one(
        {"_id": ObjectId(job_id)},
        {"$set": {
            "completionPhotos": photo_urls,
            "completionTime": datetime.utcnow().isoformat(),
            "status": "awaiting_approval",
            "approvalDeadline": datetime.utcnow().isoformat(),
        }}
    )
    return {"message": "Completion submitted! Customer has 24 hours to approve."}

@app.post("/api/jobs/{job_id}/approve")
async def approve_job(job_id: str):
    return await release_payment(job_id)

@app.post("/api/jobs/{job_id}/dispute")
async def open_dispute(job_id: str, dispute: DisputeRequest):
    await db.jobs.update_one(
        {"_id": ObjectId(job_id)},
        {"$set": {"status": "disputed"}}
    )
    await db.disputes.insert_one({
        "jobId": job_id,
        "reason": dispute.reason,
        "submittedBy": dispute.submittedBy,
        "status": "open",
        "openedAt": datetime.utcnow().isoformat(),
    })
    return {"message": "Dispute opened. Admin will review within 24 hours."}

# --- DISPUTES ---
@app.get("/api/disputes")
async def get_disputes():
    disputes = await db.disputes.find({"status": "open"}).to_list(50)
    return [fix_id(d) for d in disputes]

@app.post("/api/disputes/{dispute_id}/resolve")
async def resolve_dispute(dispute_id: str, resolution: str, job_id: str):
    await db.disputes.update_one(
        {"_id": ObjectId(dispute_id)},
        {"$set": {"status": "resolved", "resolution": resolution, "resolvedAt": datetime.utcnow().isoformat()}}
    )
    if resolution == "release_to_provider":
        await release_payment(job_id)
    elif resolution == "refund_customer":
        await db.jobs.update_one({"_id": ObjectId(job_id)}, {"$set": {"status": "refunded"}})
    return {"message": f"Dispute resolved: {resolution}"}

# --- ADMIN ---
@app.get("/api/admin/users")
async def get_all_users():
    users = await db.users.find({}, {"password": 0}).to_list(500)
    return [fix_id(u) for u in users]

@app.get("/api/admin/jobs")
async def get_all_jobs():
    jobs = await db.jobs.find({}).to_list(500)
    return [fix_id(j) for j in jobs]

@app.post("/api/admin/suspend")
async def suspend_user(data: SuspendUser):
    await db.users.update_one({"email": data.email}, {"$set": {"status": "suspended"}})
    return {"message": f"User {data.email} suspended. One-strike policy enforced."}

@app.post("/api/admin/unsuspend")
async def unsuspend_user(data: SuspendUser):
    await db.users.update_one({"email": data.email}, {"$set": {"status": "active"}})
    return {"message": f"User {data.email} reactivated."}

@app.get("/api/admin/stats")
async def get_stats():
    total_users = await db.users.count_documents({})
    total_jobs = await db.jobs.count_documents({})
    active_jobs = await db.jobs.count_documents({"status": "open"})
    completed_jobs = await db.jobs.count_documents({"status": "completed"})
    open_disputes = await db.disputes.count_documents({"status": "open"})
    return {
        "totalUsers": total_users,
        "totalJobs": total_jobs,
        "activeJobs": active_jobs,
        "completedJobs": completed_jobs,
        "openDisputes": open_disputes,
    }

# --- REVIEWS ---
@app.post("/api/reviews")
async def submit_review(job_id: str, reviewer_email: str, provider_email: str, rating: int, comment: str):
    await db.reviews.insert_one({
        "jobId": job_id,
        "reviewerEmail": reviewer_email,
        "providerEmail": provider_email,
        "rating": rating,
        "comment": comment,
        "createdAt": datetime.utcnow().isoformat(),
    })
    reviews = await db.reviews.find({"providerEmail": provider_email}).to_list(1000)
    if reviews:
        avg = sum(r["rating"] for r in reviews) / len(reviews)
        await db.users.update_one({"email": provider_email}, {"$set": {"rating": round(avg, 1)}})
    return {"message": "Review submitted!"}

@app.get("/")
async def root():
    return {"message": "Serve Now API is running!", "version": "1.0.0"}
