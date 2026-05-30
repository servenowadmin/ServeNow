import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { getEmail, getName, isLoggedIn, logout } from '../api';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState({ firstName: '', lastName: '', email: getEmail() || '', phone: '', zip: '', city: '' });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const [reviewModal, setReviewModal] = useState(null);
  const [disputeModal, setDisputeModal] = useState(null);
  const [approveModal, setApproveModal] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [disputeReason, setDisputeReason] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) { navigate('/login'); return; }
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const email = getEmail();
    try {
      const [userData, jobsData] = await Promise.all([
        api.getUser(email),
        api.getCustomerJobs(email),
      ]);
      if (userData && !userData.detail) setUser(userData);
      if (Array.isArray(jobsData)) setJobs(jobsData);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
    setLoading(false);
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const updated = await api.updateUser(user.email, {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        zip: user.zip,
        city: user.city,
      });
      if (updated && !updated.detail) {
        setUser(updated);
        showNotification('Profile updated successfully!');
      }
    } catch (err) {
      showNotification('Failed to save. Please try again.');
    }
    setSaving(false);
  };

  const handleApprove = async (job) => {
    try {
      await api.approveJob(job._id);
      showNotification(`Payment of $${job.budget} released!`);
      setApproveModal(null);
      loadData();
    } catch (err) {
      showNotification('Failed to approve. Try again.');
    }
  };

  const handleDispute = async (job) => {
    try {
      await api.openDispute(job._id, disputeReason, user.email);
      showNotification('Dispute submitted. Admin will review within 24 hours.');
      setDisputeModal(null);
      setDisputeReason('');
      loadData();
    } catch (err) {
      showNotification('Failed to submit dispute. Try again.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const statusConfig = {
    'open': { color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', label: 'Open' },
    'in_progress': { color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500', label: 'In Progress' },
    'awaiting_approval': { color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500', label: 'Awaiting Approval' },
    'completed': { color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', label: 'Completed' },
    'disputed': { color: 'bg-red-100 text-red-700', dot: 'bg-red-500', label: 'Disputed' },
  };

  const categoryColors = {
    'Cleaning': 'bg-blue-50 text-blue-700',
    'Junk Removal': 'bg-orange-50 text-orange-700',
    'Handyman': 'bg-purple-50 text-purple-700',
    'Yard Care': 'bg-green-50 text-green-700',
    'Moving': 'bg-red-50 text-red-700',
    'Custom Task': 'bg-gray-50 text-gray-700',
  };

  const activeJobs = jobs.filter(j => j.status !== 'completed');
  const escrowJobs = jobs.filter(j => j.escrowFunded);
  const totalSpent = jobs.filter(j => j.status === 'completed').reduce((sum, j) => sum + (j.budget || 0), 0);
  const displayName = user.firstName ? `${user.firstName} ${user.lastName}` : getName() || 'My Account';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'jobs', label: 'My Jobs', icon: '📋', badge: activeJobs.length },
    { id: 'notifications', label: 'Alerts', icon: '🔔' },
    { id: 'account', label: 'Account', icon: '👤' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-500 font-bold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl font-bold text-sm max-w-sm">
          ✅ {notification}
        </div>
      )}

      {approveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-5xl text-center mb-4">✅</div>
            <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Approve Completed Work?</h3>
            <p className="text-gray-500 text-center text-sm mb-6">
              This will release <span className="font-black text-emerald-600">${approveModal.budget}</span> from escrow. This action is <span className="font-bold">final</span>.
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-sm text-emerald-800">
              <strong>📸 Completion proof on file.</strong> Provider has submitted arrival and completion photos.
            </div>
            <div className="flex gap-3">
              <button onClick={() => setApproveModal(null)} className="flex-1 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition">Cancel</button>
              <button onClick={() => handleApprove(approveModal)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition">Release Payment</button>
            </div>
          </div>
        </div>
      )}

      {disputeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-5xl text-center mb-4">⚖️</div>
            <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Open a Dispute</h3>
            <p className="text-gray-500 text-sm text-center mb-6">Describe the issue. Admin will review and mediate within 24 hours.</p>
            <textarea
              placeholder="e.g. The job was not completed as agreed..."
              value={disputeReason}
              onChange={e => setDisputeReason(e.target.value)}
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition resize-none mb-4"
            />
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700 mb-6">
              ⚠️ Funds remain in escrow during the dispute. Admin will make a final decision.
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setDisputeModal(null); setDisputeReason(''); }} className="flex-1 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition">Cancel</button>
              <button onClick={() => handleDispute(disputeModal)} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl transition">Submit Dispute</button>
            </div>
          </div>
        </div>
      )}

      {reviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-black text-gray-900 mb-1">Leave a Review</h3>
            <p className="text-gray-500 text-sm mb-6">How did the provider do on "{reviewModal.title}"?</p>
            <div className="flex justify-center space-x-3 mb-6">
              {[1,2,3,4,5].map(star => (
                <button key={star} onClick={() => setRating(star)} className={`text-4xl transition hover:scale-110 ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</button>
              ))}
            </div>
            <textarea
              placeholder="Share your experience..."
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none mb-4"
            />
            <div className="flex gap-3">
              <button onClick={() => { setReviewModal(null); setRating(0); setReviewText(''); }} className="flex-1 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition">Skip</button>
              <button
                onClick={async () => {
                  if (reviewModal.assignedProvider) {
                    await api.submitReview(reviewModal._id, user.email, reviewModal.assignedProvider, rating, reviewText);
                  }
                  setReviewModal(null); setRating(0); setReviewText('');
                  showNotification('Review submitted! Thank you.');
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition"
              >
                Submit Review ⭐
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <span className="text-lg font-black text-gray-900">Serve Now</span>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-xs bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full">👤 Customer</span>
            <Link to="/post-job" className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-2 rounded-lg text-sm transition">+ Post a Job</Link>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 text-sm font-medium transition">Logout</button>
            <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-700 font-black text-sm">{initials}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-emerald-200 text-sm font-medium mb-1">Welcome back</p>
            <h1 className="text-3xl font-black">{displayName} 👋</h1>
            <p className="text-emerald-200 text-sm mt-1">{user.email}</p>
          </div>
          {jobs.some(j => j.status === 'awaiting_approval') && (
            <div className="bg-yellow-500 text-white rounded-2xl px-6 py-4 flex items-center space-x-4 shadow-lg">
              <span className="text-3xl">⏰</span>
              <div>
                <div className="font-black text-sm">Action Required</div>
                <div className="text-xs text-yellow-100">A job is awaiting your approval</div>
              </div>
              <button onClick={() => setActiveTab('jobs')} className="bg-white text-yellow-600 font-black text-xs px-3 py-2 rounded-lg hover:bg-yellow-50 transition whitespace-nowrap">
                Review Now →
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-5 py-4 text-sm font-bold border-b-2 transition whitespace-nowrap ${activeTab === tab.id ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge > 0 && <span className="bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{tab.badge}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Your Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Jobs Posted', value: jobs.length, icon: '📋', color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Completed', value: jobs.filter(j => j.status === 'completed').length, icon: '✅', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'In Escrow', value: `$${jobs.filter(j => j.escrowFunded && j.status !== 'completed').reduce((s, j) => s + (j.budget || 0), 0)}`, icon: '🔒', color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { label: 'Total Spent', value: `$${totalSpent}`, icon: '💰', color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map(stat => (
                <div key={stat.label} className={`${stat.bg} rounded-2xl p-5`}>
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-black text-gray-900">Active Jobs</h3>
                  <button onClick={() => setActiveTab('jobs')} className="text-emerald-600 text-sm font-bold hover:underline">View All →</button>
                </div>
                {activeJobs.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-4xl mb-2">📋</div>
                    <p className="text-sm">No active jobs yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activeJobs.map(job => (
                      <div key={job._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${statusConfig[job.status]?.dot || 'bg-gray-400'}`} />
                          <div>
                            <div className="font-bold text-gray-900 text-sm">{job.title}</div>
                            <div className="text-xs text-gray-400">{statusConfig[job.status]?.label || job.status}</div>
                          </div>
                        </div>
                        <div className="font-black text-emerald-600">${job.budget}</div>
                      </div>
                    ))}
                  </div>
                )}
                <Link to="/post-job" className="mt-4 block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition text-sm">
                  + Post a New Job
                </Link>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-black text-gray-900 mb-4">Escrow Protection</h3>
                {escrowJobs.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-4xl mb-2">🔒</div>
                    <p className="text-sm">No funds in escrow</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {escrowJobs.map(job => (
                      <div key={job._id} className={`border-2 rounded-xl p-4 ${job.status === 'awaiting_approval' ? 'border-yellow-300 bg-yellow-50' : job.status === 'disputed' ? 'border-red-200 bg-red-50' : 'border-gray-100'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-bold text-gray-900 text-sm">{job.title}</div>
                          <div className="font-black text-emerald-600">${job.budget}</div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusConfig[job.status]?.color || 'bg-gray-100 text-gray-700'}`}>{statusConfig[job.status]?.label || job.status}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
                  <strong>🔒 How Escrow Works:</strong> Your money is held safely until you approve the completed work. 24 hour review window. Auto-releases if no response.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">My Jobs</h2>
              <Link to="/post-job" className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-2.5 rounded-xl text-sm transition">+ Post New Job</Link>
            </div>
            {jobs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-black text-gray-900 mb-2">No jobs yet</h3>
                <p className="text-gray-500 mb-6">Post your first job and get bids from verified providers.</p>
                <Link to="/post-job" className="bg-emerald-600 text-white font-black px-8 py-3 rounded-xl hover:bg-emerald-700 transition">Post a Job →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map(job => (
                  <div key={job._id} className={`bg-white rounded-2xl border-2 p-6 transition ${job.status === 'awaiting_approval' ? 'border-yellow-300' : job.status === 'disputed' ? 'border-red-200' : 'border-gray-100 hover:border-emerald-200'}`}>
                    {job.status === 'awaiting_approval' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-4">
                        <span className="text-yellow-600 font-black text-sm">⏰ Approval Required — Review and approve the completed work</span>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`text-xs font-black px-3 py-1 rounded-full ${categoryColors[job.category] || 'bg-gray-100 text-gray-700'}`}>{job.category}</span>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusConfig[job.status]?.color || 'bg-gray-100 text-gray-700'}`}>{statusConfig[job.status]?.label || job.status}</span>
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-gray-500 text-sm mb-3">{job.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <span>📍 {job.city} {job.zip}</span>
                          <span>📅 Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                          <span>💬 {job.bidCount || 0} bids</span>
                          {job.escrowFunded && <span className="text-yellow-600 font-bold">🔒 Escrow Funded</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-emerald-600">${job.budget}</div>
                      </div>
                    </div>
                    {job.assignedProviderName && (
                      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center font-black text-emerald-700 text-sm">
                            {job.assignedProviderName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-sm">{job.assignedProviderName}</div>
                            <div className="text-xs text-gray-400">Assigned Provider</div>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          {job.status === 'awaiting_approval' && (
                            <>
                              <button onClick={() => setDisputeModal(job)} className="border-2 border-red-300 text-red-600 font-black px-4 py-2 rounded-xl text-sm hover:bg-red-50 transition">⚖️ Dispute</button>
                              <button onClick={() => setApproveModal(job)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-2 rounded-xl text-sm transition">✅ Approve & Pay</button>
                            </>
                          )}
                          {job.status === 'completed' && (
                            <button onClick={() => setReviewModal(job)} className="bg-yellow-400 hover:bg-yellow-500 text-white font-black px-5 py-2 rounded-xl text-sm transition">⭐ Leave Review</button>
                          )}
                          {job.status === 'disputed' && (
                            <span className="bg-red-100 text-red-700 font-black px-4 py-2 rounded-xl text-sm">⚖️ Under Admin Review</span>
                          )}
                        </div>
                      </div>
                    )}
                    {!job.assignedProviderName && job.status === 'open' && (
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-sm text-gray-500"><span className="font-bold text-gray-900">{job.bidCount || 0} providers</span> have bid</div>
                        <Link to="/marketplace" className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-2 rounded-xl text-sm transition">View Marketplace →</Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Notifications</h2>
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-lg font-black text-gray-900 mb-2">Notifications Coming Soon</h3>
              <p className="text-gray-500 text-sm">You'll receive alerts when providers bid on your jobs, when work is completed, and when payments are processed.</p>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Account Settings</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-lg font-black text-gray-900 mb-5">Personal Info</h3>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">{initials}</div>
                    <div>
                      <div className="font-black text-gray-900">{displayName}</div>
                      <div className="text-gray-400 text-sm">{user.email}</div>
                      <div className="text-emerald-600 text-xs font-bold mt-1">👤 Customer Account</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">First Name</label>
                      <input type="text" value={user.firstName || ''} onChange={e => setUser({ ...user, firstName: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Last Name</label>
                      <input type="text" value={user.lastName || ''} onChange={e => setUser({ ...user, lastName: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Email</label>
                      <input type="text" value={user.email || ''} disabled className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Phone</label>
                      <input type="text" value={user.phone || ''} onChange={e => setUser({ ...user, phone: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Zip Code</label>
                      <input type="text" value={user.zip || ''} onChange={e => setUser({ ...user, zip: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">City</label>
                      <input type="text" value={user.city || ''} onChange={e => setUser({ ...user, city: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                    </div>
                  </div>
                  <button onClick={handleSaveProfile} disabled={saving} className="mt-5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-black px-6 py-3 rounded-xl transition text-sm">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h4 className="font-black text-gray-900 mb-4">Quick Links</h4>
                  <div className="space-y-2">
                    <Link to="/post-job" className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-medium text-sm transition">
                      <span>📋 Post a New Job</span><span>→</span>
                    </Link>
                    <Link to="/marketplace" className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-medium text-sm transition">
                      <span>🔍 Browse Marketplace</span><span>→</span>
                    </Link>
                  </div>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <h4 className="font-black text-emerald-800 mb-2">🔒 Payment Protection</h4>
                  <p className="text-emerald-700 text-xs leading-relaxed">All payments secured by Serve Now Escrow. Funds never released without your approval.</p>
                </div>
                <div className="bg-white rounded-2xl border border-red-100 p-5">
                  <h4 className="font-black text-gray-900 mb-3">Danger Zone</h4>
                  <button onClick={handleLogout} className="w-full text-red-600 border border-red-200 hover:bg-red-50 font-bold py-2.5 rounded-xl text-sm transition">Sign Out</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CustomerDashboard;
