import os
from fastapi import FastAPI, Depends, HTTPException, status
from motor.motor_async_client import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import stripe
from datetime import datetime

app = FastAPI(title="Serve Now API")

# DB Connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client.servenow

# Platform Settings
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
PLATFORM_COMMISSION = 0.20

# --- DATA MODELS ---
class Job(BaseModel):
    title: str
    category: str
    description: str
    zip_code: str
    budget: float
    status: str = "open"
    customer_email: EmailStr

# --- ENDPOINTS ---

@app.post("/api/jobs")
async def post_job(job: Job):
    result = await db.jobs.insert_one(job.dict())
    return {"id": str(result.inserted_id)}

@app.get("/api/jobs")
async def list_jobs(zip_code: Optional[str] = None):
    query = {"status": "open"}
    if zip_code:
        query["zip_code"] = zip_code
    jobs = await db.jobs.find(query).to_list(100)
    for j in jobs: j["_id"] = str(j["_id"])
    return jobs

# --- THE MONEY (ESCROW) ---
@app.post("/api/payments/create-escrow")
async def create_escrow(amount: float, job_id: str):
    commission = int(amount * PLATFORM_COMMISSION * 100) # In cents
    try:
        intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),
            currency="usd",
            application_fee_amount=commission,
            metadata={"job_id": job_id}
        )
        return {"client_secret": intent.client_secret}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# --- ADMIN COMMANDS ---
@app.post("/api/admin/suspend-user")
async def suspend_user(email: str):
    await db.users.update_one({"email": email}, {"$set": {"status": "suspended"}})
    return {"message": "User suspended. One-strike policy enforced."}