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
                className={`flex items-center space-x-2 px-5 py-4 text-sm font-bold border-b-2 transition whitespace-nowrap ${activeTab === tab.id ? 'border-eme
