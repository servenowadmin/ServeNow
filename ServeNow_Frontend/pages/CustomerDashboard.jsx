import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [reviewModal, setReviewModal] = useState(null);
  const [disputeModal, setDisputeModal] = useState(null);
  const [approveModal, setApproveModal] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [disputeReason, setDisputeReason] = useState('');
  const [notification, setNotification] = useState('');

  const user = {
    name: 'John Smith',
    email: 'john@email.com',
    memberSince: 'January 2026',
    avatar: 'JS',
  };

  const stats = [
    { label: 'Jobs Posted', value: '4', icon: '📋', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Completed', value: '2', icon: '✅', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'In Escrow', value: '$370', icon: '🔒', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Total Spent', value: '$620', icon: '💰', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const jobs = [
    {
      id: 1,
      title: 'Deep House Clean',
      category: 'Cleaning',
      budget: 250,
      status: 'Awaiting Approval',
      provider: 'Maria Garcia',
      providerRating: 4.9,
      providerTier: 'Pro',
      posted: 'Jan 10, 2026',
      scheduledDate: 'Jan 14, 2026',
      bids: 5,
      escrow: true,
      arrivalPhoto: true,
      completionPhoto: true,
      hoursLeft: 18,
      description: 'Full deep clean of 3 bedroom 2 bath house.',
      city: 'Klamath Falls, OR',
    },
    {
      id: 2,
      title: 'TV Wall Mount Install',
      category: 'Handyman',
      budget: 120,
      status: 'Completed',
      provider: 'Maria Garcia',
      providerRating: 4.9,
      providerTier: 'Pro',
      posted: 'Jan 6, 2026',
      scheduledDate: 'Jan 8, 2026',
      bids: 3,
      escrow: false,
      reviewed: false,
      description: '65 inch TV mounted on drywall, wires hidden.',
      city: 'Klamath Falls, OR',
    },
    {
      id: 3,
      title: 'Lawn Mowing',
      category: 'Yard Care',
      budget: 80,
      status: 'Disputed',
      provider: 'Bob Johnson',
      providerRating: 3.2,
      providerTier: 'Basic',
      posted: 'Jan 8, 2026',
      scheduledDate: 'Jan 9, 2026',
      bids: 4,
      escrow: true,
      description: 'Weekly lawn mowing front and back.',
      city: 'Klamath Falls, OR',
    },
    {
      id: 4,
      title: 'Garage Junk Removal',
      category: 'Junk Removal',
      budget: 400,
      status: 'Open',
      provider: null,
      posted: 'Jan 11, 2026',
      scheduledDate: 'Jan 18, 2026',
      bids: 7,
      escrow: false,
      description: 'Full garage cleanout. Large furniture and appliances.',
      city: 'Klamath Falls, OR',
    },
  ];

  const bids = [
    { id: 1, jobTitle: 'Garage Junk Removal', provider: 'Carlos Rivera', rating: 4.7, tier: 'Pro', amount: 380, note: 'I can do this Saturday morning, have a full truck for haul away.', submitted: '2 hours ago' },
    { id: 2, jobTitle: 'Garage Junk Removal', provider: 'Mike Torres', rating: 4.5, tier: 'Basic', amount: 350, note: 'Available any day this week. Price includes all disposal fees.', submitted: '4 hours ago' },
    { id: 3, jobTitle: 'Garage Junk Removal', provider: 'Lisa Chen', rating: 4.9, tier: 'Elite', amount: 420, note: 'Gold Shield verified. Same-day available. Before/after photos guaranteed.', submitted: '5 hours ago' },
  ];

  const notifications = [
    { id: 1, type: 'approval', message: 'Maria Garcia marked your Deep House Clean as complete. You have 18 hours to approve or dispute.', time: '2 hours ago', unread: true },
    { id: 2, type: 'bid', message: 'You received 3 new bids on Garage Junk Removal.', time: '4 hours ago', unread: true },
    { id: 3, type: 'dispute', message: 'Your dispute on Lawn Mowing is under review by Serve Now admin.', time: '1 day ago', unread: false },
    { id: 4, type: 'complete', message: 'TV Wall Mount Install was marked complete and payment released to Maria Garcia.', time: '3 days ago', unread: false },
  ];

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const statusConfig = {
    'Open': { color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
    'In Progress': { color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
    'Awaiting Approval': { color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
    'Completed': { color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
    'Disputed': { color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
  };

  const categoryColors = {
    'Cleaning': 'bg-blue-50 text-blue-700',
    'Junk Removal': 'bg-orange-50 text-orange-700',
    'Handyman': 'bg-purple-50 text-purple-700',
    'Yard Care': 'bg-green-50 text-green-700',
    'Moving': 'bg-red-50 text-red-700',
    'Custom Task': 'bg-gray-50 text-gray-700',
  };

  const tierBadge = {
    'Elite': 'bg-yellow-100 text-yellow-700',
    'Pro': 'bg-emerald-100 text-emerald-700',
    'Basic': 'bg-gray-100 text-gray-600',
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'jobs', label: 'My Jobs', icon: '📋' },
    { id: 'bids', label: 'Bids', icon: '💬', badge: bids.length },
    { id: 'notifications', label: 'Alerts', icon: '🔔', badge: notifications.filter(n => n.unread).length },
    { id: 'account', label: 'Account', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl font-bold text-sm max-w-sm animate-pulse">
          ✅ {notification}
        </div>
      )}

      {approveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-5xl text-center mb-4">✅</div>
            <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Approve Completed Work?</h3>
            <p className="text-gray-500 text-center text-sm mb-6">
              Approving will release <span className="font-black text-emerald-600">${approveModal.budget}</span> from escrow to {approveModal.provider}. This action is <span className="font-bold">final</span>.
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-sm text-emerald-800">
              <strong>📸 Proof submitted:</strong> Arrival photo + completion photos on file.
            </div>
            <div className="flex gap-3">
              <button onClick={() => setApproveModal(null)} className="flex-1 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition">Cancel</button>
              <button
                onClick={() => { setApproveModal(null); showNotification(`Payment of $${approveModal.budget} released to ${approveModal.provider}!`); }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition"
              >
                Release Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {disputeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-5xl text-center mb-4">⚖️</div>
            <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Open a Dispute</h3>
            <p className="text-gray-500 text-sm text-center mb-6">Describe the issue. Our admin team will review and mediate within 24 hours.</p>
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
              <button
                onClick={() => { setDisputeModal(null); setDisputeReason(''); showNotification('Dispute submitted. Admin will review within 24 hours.'); }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl transition"
              >
                Submit Dispute
              </button>
            </div>
          </div>
        </div>
      )}

      {reviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-black text-gray-900 mb-1">Rate {reviewModal.provider}</h3>
            <p className="text-gray-500 text-sm mb-6">How did they do on "{reviewModal.title}"?</p>
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
                onClick={() => { setReviewModal(null); setRating(0); setReviewText(''); showNotification('Review submitted! Thank you.'); }}
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
            <Link to="/post-job" className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-2 rounded-lg text-sm transition">+ Post a Job</Link>
            <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-700 font-black text-sm">{user.avatar}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-emerald-200 text-sm font-medium mb-1">Welcome back</p>
            <h1 className="text-3xl font-black">{user.name} 👋</h1>
            <p className="text-emerald-200 text-sm mt-1">Member since {user.memberSince}</p>
          </div>
          <div className="bg-yellow-500 text-white rounded-2xl px-6 py-4 flex items-center space-x-4 shadow-lg">
            <span className="text-3xl">⏰</span>
            <div>
              <div className="font-black text-sm">Action Required</div>
              <div className="text-xs text-yellow-100">Deep House Clean awaiting your approval — 18 hrs left</div>
            </div>
            <button onClick={() => setActiveTab('jobs')} className="bg-white text-yellow-600 font-black text-xs px-3 py-2 rounded-lg hover:bg-yellow-50 transition whitespace-nowrap">
              Review Now →
            </button>
          </div>
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
                {tab.badge > 0 && (
                  <span className="bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{tab.badge}</span>
                )}
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
              {stats.map(stat => (
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
                <div className="space-y-3">
                  {jobs.filter(j => j.status !== 'Completed').map(job => (
                    <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${statusConfig[job.status]?.dot}`} />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{job.title}</div>
                          <div className="text-xs text-gray-400">{job.status}</div>
                        </div>
                      </div>
                      <div className="font-black text-emerald-600">${job.budget}</div>
                    </div>
                  ))}
                </div>
                <Link to="/post-job" className="mt-4 block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition text-sm">
                  + Post a New Job
                </Link>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-black text-gray-900 mb-4">Escrow Protection</h3>
                <div className="space-y-4">
                  {jobs.filter(j => j.escrow).map(job => (
                    <div key={job.id} className={`border-2 rounded-xl p-4 ${job.status === 'Awaiting Approval' ? 'border-yellow-300 bg-yellow-50' : job.status === 'Disputed' ? 'border-red-200 bg-red-50' : 'border-gray-100'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-bold text-gray-900 text-sm">{job.title}</div>
                        <div className="font-black text-emerald-600">${job.budget}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusConfig[job.status]?.color}`}>{job.status}</span>
                        {job.status === 'Awaiting Approval' && <span className="text-xs text-yellow-700 font-bold">⏰ {job.hoursLeft}h to approve</span>}
                        {job.status === 'Disputed' && <span className="text-xs text-red-700 font-bold">⚖️ Under Review</span>}
                      </div>
                    </div>
                  ))}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
                    <strong>🔒 How Escrow Works:</strong> Your money is held safely until you approve the completed work. You have 24 hours to review. Funds auto-release if no response.
                  </div>
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
            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job.id} className={`bg-white rounded-2xl border-2 p-6 transition ${job.status === 'Awaiting Approval' ? 'border-yellow-300' : job.status === 'Disputed' ? 'border-red-200' : 'border-gray-100 hover:border-emerald-200'}`}>
                  {job.status === 'Awaiting Approval' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-4">
                      <span className="text-yellow-600 font-black text-sm">⏰ Approval Required</span>
                      <span className="text-yellow-700 text-xs ml-2">— {job.hoursLeft} hours left before auto-release</span>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`text-xs font-black px-3 py-1 rounded-full ${categoryColors[job.category]}`}>{job.category}</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusConfig[job.status]?.color}`}>{job.status}</span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-gray-500 text-sm mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span>📍 {job.city}</span>
                        <span>📅 Posted {job.posted}</span>
                        {job.scheduledDate && <span>🗓 Scheduled {job.scheduledDate}</span>}
                        <span>💬 {job.bids} bids</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-emerald-600">${job.budget}</div>
                      {job.escrow && <div className="text-xs text-yellow-600 font-bold mt-1">🔒 In Escrow</div>}
                    </div>
                  </div>
                  {job.provider && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center font-black text-emerald-700 text-sm">
                          {job.provider.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{job.provider}</div>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <span className="text-yellow-500 text-xs">★ {job.providerRating}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tierBadge[job.providerTier]}`}>{job.providerTier}</span>
                          </div>
                        </div>
                      </div>
                      {(job.arrivalPhoto || job.completionPhoto) && (
                        <div className="flex items-center space-x-3">
                          {job.arrivalPhoto && <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs text-emerald-700 font-bold">📍 Arrival Photo</div>}
                          {job.completionPhoto && <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs text-emerald-700 font-bold">📸 Completion Photos</div>}
                        </div>
                      )}
                      <div className="flex space-x-3">
                        {job.status === 'Awaiting Approval' && (
                          <>
                            <button onClick={() => setDisputeModal(job)} className="border-2 border-red-300 text-red-600 font-black px-4 py-2 rounded-xl text-sm hover:bg-red-50 transition">⚖️ Dispute</button>
                            <button onClick={() => setApproveModal(job)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-2 rounded-xl text-sm transition">✅ Approve & Pay</button>
                          </>
                        )}
                        {job.status === 'Completed' && !job.reviewed && (
                          <button onClick={() => setReviewModal(job)} className="bg-yellow-400 hover:bg-yellow-500 text-white font-black px-5 py-2 rounded-xl text-sm transition">⭐ Leave Review</button>
                        )}
                        {job.status === 'Disputed' && (
                          <span className="bg-red-100 text-red-700 font-black px-4 py-2 rounded-xl text-sm">⚖️ Under Admin Review</span>
                        )}
                      </div>
                    </div>
                  )}
                  {!job.provider && job.status === 'Open' && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="text-sm text-gray-500"><span className="font-bold text-gray-900">{job.bids} providers</span> have bid on this job</div>
                      <button onClick={() => setActiveTab('bids')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-2 rounded-xl text-sm transition">Review Bids →</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bids' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Incoming Bids</h2>
            <p className="text-gray-500 text-sm mb-6">Review and accept bids from verified providers</p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 mb-6 text-sm text-emerald-800">
              <strong>🔒 Escrow reminder:</strong> You'll fund escrow when accepting a bid. Payment only releases after you approve the work.
            </div>
            <div className="space-y-4">
              {bids.map((bid, index) => (
                <div key={bid.id} className={`bg-white rounded-2xl border-2 p-6 transition ${index === 0 ? 'border-emerald-300' : 'border-gray-100 hover:border-emerald-200'}`}>
                  {index === 0 && <div className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mb-3">🏆 Lowest Bid</div>}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center font-black text-emerald-700">
                        {bid.provider.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-black text-gray-900">{bid.provider}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tierBadge[bid.tier]}`}>{bid.tier}</span>
                          {bid.tier === 'Elite' && <span className="text-xs">🏆</span>}
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-yellow-500 text-sm">{'★'.repeat(Math.floor(bid.rating))}</span>
                          <span className="text-gray-500 text-xs font-medium">{bid.rating} rating</span>
                        </div>
                        <p className="text-gray-600 text-sm">{bid.note}</p>
                        <p className="text-gray-400 text-xs mt-2">Submitted {bid.submitted}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-emerald-600">${bid.amount}</div>
                      <div className="text-xs text-gray-400 mt-1">for {bid.jobTitle}</div>
                      <button
                        onClick={() => showNotification(`Bid from ${bid.provider} accepted! Proceed to escrow funding.`)}
                        className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-2 rounded-xl text-sm transition w-full"
                      >
                        Accept Bid →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Notifications</h2>
            <div className="space-y-3">
              {notifications.map(notif => (
                <div key={notif.id} className={`bg-white rounded-2xl border p-5 flex items-start space-x-4 transition ${notif.unread ? 'border-emerald-200 bg-emerald-50' : 'border-gray-100'}`}>
                  <div className="text-2xl">
                    {notif.type === 'approval' ? '⏰' : notif.type === 'bid' ? '💬' : notif.type === 'dispute' ? '⚖️' : '✅'}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${notif.unread ? 'font-bold text-gray-900' : 'text-gray-600'}`}>{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  </div>
                  {notif.unread && <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />}
                </div>
              ))}
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
                    <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">{user.avatar}</div>
                    <div>
                      <div className="font-black text-gray-900">{user.name}</div>
                      <div className="text-gray-400 text-sm">{user.email}</div>
                      <div className="text-emerald-600 text-xs font-bold mt-1">Customer Account • Member since {user.memberSince}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'First Name', value: 'John' },
                      { label: 'Last Name', value: 'Smith' },
                      { label: 'Email', value: 'john@email.com' },
                      { label: 'Phone', value: '(555) 123-4567' },
                      { label: 'Zip Code', value: '97601' },
                      { label: 'City', value: 'Klamath Falls, OR' },
                    ].map(field => (
                      <div key={field.label}>
                        <label className="block text-xs font-bold text-gray-500 mb-1">{field.label}</label>
                        <input type="text" defaultValue={field.value} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                      </div>
                    ))}
                  </div>
                  <button onClick={() => showNotification('Profile updated successfully!')} className="mt-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3 rounded-xl transition text-sm">
                    Save Changes
                  </button>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-lg font-black text-gray-900 mb-5">Change Password</h3>
                  <div className="space-y-4">
                    {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
                      <div key={label}>
                        <label className="block text-xs font-bold text-gray-500 mb-1">{label}</label>
                        <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                      </div>
                    ))}
                    <button className="bg-gray-900 hover:bg-gray-700 text-white font-black px-6 py-3 rounded-xl transition text-sm">Update Password</button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h4 className="font-black text-gray-900 mb-4">Quick Links</h4>
                  <div className="space-y-2">
                    <Link to="/post-job" className="flex items-center justify-between w-full text-left px-4 py-3 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-medium text-sm transition">
                      <span>📋 Post a New Job</span><span>→</span>
                    </Link>
                    <Link to="/marketplace" className="flex items-center justify-between w-full text-left px-4 py-3 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-medium text-sm transition">
                      <span>🔍 Browse Providers</span><span>→</span>
                    </Link>
                    <button className="flex items-center justify-between w-full text-left px-4 py-3 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-medium text-sm transition">
                      <span>💬 Contact Support</span><span>→</span>
                    </button>
                  </div>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <h4 className="font-black text-emerald-800 mb-2">🔒 Payment Protection</h4>
                  <p className="text-emerald-700 text-xs leading-relaxed">All payments secured by Serve Now Escrow. Funds never released without your approval.</p>
                </div>
                <div className="bg-white rounded-2xl border border-red-100 p-5">
                  <h4 className="font-black text-gray-900 mb-3">Danger Zone</h4>
                  <button className="w-full text-red-600 border border-red-200 hover:bg-red-50 font-bold py-2.5 rounded-xl text-sm transition">Delete Account</button>
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
