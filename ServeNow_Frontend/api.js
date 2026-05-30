const BASE_URL = import.meta.env.VITE_API_URL || 'https://servenow-production.up.railway.app';

const api = {
  // AUTH
  register: async (userData) => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  // JOBS
  getJobs: async (zip = '', category = '') => {
    const params = new URLSearchParams();
    if (zip) params.append('zip', zip);
    if (category && category !== 'All Categories') params.append('category', category);
    const res = await fetch(`${BASE_URL}/api/jobs?${params}`);
    return res.json();
  },

  postJob: async (jobData) => {
    const res = await fetch(`${BASE_URL}/api/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });
    return res.json();
  },

  getCustomerJobs: async (email) => {
    const res = await fetch(`${BASE_URL}/api/jobs/customer/${email}`);
    return res.json();
  },

  approveJob: async (jobId) => {
    const res = await fetch(`${BASE_URL}/api/jobs/${jobId}/approve`, {
      method: 'POST',
    });
    return res.json();
  },

  openDispute: async (jobId, reason, submittedBy) => {
    const res = await fetch(`${BASE_URL}/api/jobs/${jobId}/dispute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, reason, submittedBy }),
    });
    return res.json();
  },

  // BIDS
  submitBid: async (bidData) => {
    const res = await fetch(`${BASE_URL}/api/bids`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bidData),
    });
    return res.json();
  },

  getBidsForJob: async (jobId) => {
    const res = await fetch(`${BASE_URL}/api/bids/job/${jobId}`);
    return res.json();
  },

  getProviderBids: async (email) => {
    const res = await fetch(`${BASE_URL}/api/bids/provider/${email}`);
    return res.json();
  },

  acceptBid: async (bidId) => {
    const res = await fetch(`${BASE_URL}/api/bids/${bidId}/accept`, {
      method: 'POST',
    });
    return res.json();
  },

  // ADMIN
  getAllUsers: async () => {
    const res = await fetch(`${BASE_URL}/api/admin/users`);
    return res.json();
  },

  getAllJobs: async () => {
    const res = await fetch(`${BASE_URL}/api/admin/jobs`);
    return res.json();
  },

  suspendUser: async (email) => {
    const res = await fetch(`${BASE_URL}/api/admin/suspend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return res.json();
  },

  getStats: async () => {
    const res = await fetch(`${BASE_URL}/api/admin/stats`);
    return res.json();
  },

  getDisputes: async () => {
    const res = await fetch(`${BASE_URL}/api/disputes`);
    return res.json();
  },

  resolveDispute: async (disputeId, resolution, jobId) => {
    const res = await fetch(`${BASE_URL}/api/disputes/${disputeId}/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resolution, job_id: jobId }),
    });
    return res.json();
  },
// USER PROFILE
  getUser: async (email) => {
    const res = await fetch(`${BASE_URL}/api/users/${email}`);
    return res.json();
  },

  updateUser: async (email, profileData) => {
    const res = await fetch(`${BASE_URL}/api/users/${email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
    return res.json();
  },
  

  updateUser: async (email, profileData) => {
    const res = await fetch(${BASE_URL}/api/users/${email}, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
    return res.json();
  },
  // REVIEWS
  submitReview: async (jobId, reviewerEmail, providerEmail, rating, comment) => {
    const res = await fetch(`${BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job_id: jobId, reviewer_email: reviewerEmail, provider_email: providerEmail, rating, comment }),
    });
    return res.json();
  },
};

// Token helpers
export const saveToken = (token, role, email, firstName) => {
  localStorage.setItem('sn_token', token);
  localStorage.setItem('sn_role', role);
  localStorage.setItem('sn_email', email);
  localStorage.setItem('sn_name', firstName);
};

export const getToken = () => localStorage.getItem('sn_token');
export const getRole = () => localStorage.getItem('sn_role');
export const getEmail = () => localStorage.getItem('sn_email');
export const getName = () => localStorage.getItem('sn_name');
export const isLoggedIn = () => !!localStorage.getItem('sn_token');
export const logout = () => {
  localStorage.removeItem('sn_token');
  localStorage.removeItem('sn_role');
  localStorage.removeItem('sn_email');
  localStorage.removeItem('sn_name');
};

export default api;
