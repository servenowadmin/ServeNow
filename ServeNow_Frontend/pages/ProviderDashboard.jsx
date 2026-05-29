import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotification] = useState('');
  const [bidModal, setBidModal] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidNote, setBidNote] = useState('');
  const [arrivalModal, setArrivalModal] = useState(null);
  const [completionModal, setCompletionModal] = useState(null);

  const provider = {
    name: 'Maria Garcia',
    email: 'maria@email.com',
    avatar: 'MG',
    tier: 'Pro',
    rating: 4.9,
    completedJobs: 47,
    memberSince: 'December 2025',
    verified: true,
    skills: ['Cleaning', 'Yard Care', 'Handyman'],
    zip: '97601',
    city: 'Klamath Falls, OR',
  };

  const stats = [
    { label: 'Jobs Completed', value: '47', icon: '✅', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Earned', value: '$4,280', icon: '💰', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Active Bids', value: '3', icon: '💬', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Rating', value: '4.9★', icon: '⭐', color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const availableJobs = [
    { id: 1, title: 'Full House Deep Clean', category: 'Cleaning', budget: 250, zip: '97601', city: 'Klamath Falls, OR', posted: '2 hours ago', bids: 3, urgent: false, description: 'Need a full deep clean of 3 bedroom 2 bath house. Move-out clean required.' },
    { id: 2, title: 'Weekly Lawn Mowing', category: 'Yard Care', budget: 80, zip: '97601', city: 'Klamath Falls, OR', posted: '1 hour ago', bids: 2, urgent: false, description: 'Weekly lawn mowing for medium sized yard. Front and back. Edging included.' },
    { id: 3, title: 'Garage Junk Removal', category: 'Junk Removal', budget: 400, zip: '97603', city: 'Klamath Falls, OR', posted: '4 hours ago', bids: 7, urgent: true, description: 'Full garage cleanout. Large furniture, old appliances, general junk. Need haul away.' },
    { id: 4, title: 'TV Wall Mount Install', category: 'Handyman', budget: 120, zip: '97601', city: 'Klamath Falls, OR', posted: '30 min ago', bids: 1, urgent: false, description: '65 inch TV needs to be mounted on drywall. Studs need to be located. Wires hidden.' },
    { id: 5, title: 'Office Deep Clean', category: 'Cleaning', budget: 300, zip: '97601', city: 'Klamath Falls, OR', posted: '3 hours ago', bids: 4, urgent: false, description: 'Small office needs full deep clean. Floors, windows, bathrooms, kitchen area.' },
  ];

  const myJobs = [
    { id: 1, title: 'Deep House Clean', customer: 'John Smith', budget: 250, status: 'Awaiting Customer Approval', scheduledDate: 'Jan 14, 2026', arrivalSubmitted: true, completionSubmitted: true, hoursLeft: 18, city: 'Klamath Falls, OR', category: 'Cleaning' },
    { id: 2, title: 'Yard Trim & Edge', customer: 'Sarah Lee', budget: 95, status: 'In Progress', scheduledDate: 'Jan 15, 2026', arrivalSubmitted: true, completionSubmitted: false, city: 'Klamath Falls, OR', category: 'Yard Care' },
    { id: 3, title: 'TV Wall Mount', customer: 'Sarah Lee', budget: 120, status: 'Completed', scheduledDate: 'Jan 8, 2026', arrivalSubmitted: true, completionSubmitted: true, earned: true, city: 'Klamath Falls, OR', category: 'Handyman' },
    { id: 4, title: 'Office Cleaning', customer: 'Tech Corp', budget: 280, status: 'Completed', scheduledDate: 'Jan 6, 2026', arrivalSubmitted: true, completionSubmitted: true, earned: true, city: 'Klamath Falls, OR', category: 'Cleaning' },
  ];

  const myBids = [
    { id: 1, jobTitle: 'Full House Deep Clean', customer: 'John Smith', myBid: 230, status: 'Pending', submitted: '1 hour ago', jobBudget: 250 },
    { id: 2, jobTitle: 'Garage Junk Removal', customer: 'Mike Torres', myBid: 380, status: 'Pending', submitted: '3 hours ago', jobBudget: 400 },
    { id: 3, jobTitle: 'Weekly Lawn Care', customer: 'Sarah Lee', myBid: 75, status: 'Accepted', submitted: '2 days ago', jobBudget: 80 },
  ];

  const notifications = [
    { id: 1, type: 'payment', message: 'Payment of $120 released for TV Wall Mount Install. Funds on the way!', time: '1 hour ago', unread: true },
    { id: 2, type: 'bid', message: 'Your bid on Garage Junk Removal is still pending. 4 other providers have bid.', time: '3 hours ago', unread: true },
    { id: 3, type: 'approval', message: 'John Smith has 18 hours left to approve your Deep House Clean work.', time: '2 hours ago', unread: true },
    { id: 4, type: 'review', message: 'Sarah Lee left you a 5-star review! "Maria was amazing, highly recommend."', time: '3 days ago', unread: false },
    { id: 5, type: 'job', message: 'New Cleaning job posted near you (97601) — $300 budget.', time: '3 hours ago', unread: false },
  ];

  const earnings = [
    { month: 'January 2026', jobs: 8, gross: 1240, commission: 248, net: 992 },
    { month: 'December 2025', jobs: 12, gross: 1890, commission: 378, net: 1512 },
    { month: 'November 2025', jobs: 15, gross: 2100, commission: 420, net: 1680 },
  ];

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const statusConfig = {
    'In Progress': { color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
    'Awaiting Customer Approval': { color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
    'Completed': { color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
    'Disputed': { color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
    'Pending': { color: 'bg-blue-100 text-blue-700' },
    'Accepted': { color: 'bg-emerald-100 text-emerald-700' },
    'Rejected': { color: 'bg-red-100 text-red-700' },
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
    { id: 'browse', label: 'Browse Jobs', icon: '🔍', badge: availableJobs.length },
    { id: 'myjobs', label: 'My Jobs', icon: '📋' },
    { id: 'bids', label: 'My Bids', icon: '💬', badge: myBids.filter(b => b.status === 'Pending').length },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'notifications', label: 'Alerts', icon: '🔔', badge: notifications.filter(n => n.unread).length },
    { id: 'account', label: 'Account', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl font-bold text-sm max-w-sm">
          ✅ {notification}
        </div>
      )}

      {/* BID MODAL */}
      {bidModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-black text-gray-900 mb-1">Submit Your Bid</h3>
            <p className="text-gray-500 text-sm mb-6">"{bidModal.title}" — Customer budget: <span className="font-black text-emerald-600">${bidModal.budget}</span></p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Bid Amount ($)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    placeholder={bidModal.budget}
                    value={bidAmount}
                    onChange={e => setBidAmount(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message to Customer</label>
                <textarea
                  placeholder="Introduce yourself, explain your experience, availability..."
                  value={bidNote}
                  onChange={e => setBidNote(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none text-sm"
                />
              </div>
              {bidAmount && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm text-emerald-800">
                  <strong>Your take-home:</strong> ${(bidAmount * 0.80).toFixed(2)} after 20% platform commission
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setBidModal(null); setBidAmount(''); setBidNote(''); }} className="flex-1 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition">Cancel</button>
              <button
                onClick={() => { setBidModal(null); setBidAmount(''); setBidNote(''); showNotification(`Bid submitted on "${bidModal.title}"!`); }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition"
              >
                Submit Bid →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ARRIVAL PHOTO MODAL */}
      {arrivalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-5xl text-center mb-4">📍</div>
            <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Check-In at Job Site</h3>
            <p className="text-gray-500 text-sm text-center mb-6">Take a photo to confirm your arrival. This will be timestamped and GPS-tagged automatically.</p>
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-4 hover:border-emerald-400 transition cursor-pointer">
              <div className="text-4xl mb-2">📸</div>
              <div className="text-gray-500 font-bold text-sm">Tap to take arrival photo</div>
              <div className="text-gray-400 text-xs mt-1">Photo will include GPS + timestamp</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800 mb-6">
              📍 Current location will be attached to this photo automatically.
            </div>
            <div className="flex gap-3">
              <button onClick={() => setArrivalModal(null)} className="flex-1 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition">Cancel</button>
              <button
                onClick={() => { setArrivalModal(null); showNotification('Arrival confirmed! Customer notified you have arrived.'); }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition"
              >
                Confirm Arrival ✅
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPLETION MODAL */}
      {completionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-5xl text-center mb-4">🏁</div>
            <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Mark Job Complete</h3>
            <p className="text-gray-500 text-sm text-center mb-6">Submit your completion photos. The customer will be notified to approve and release payment.</p>
            <div className="space-y-3 mb-4">
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-emerald-400 transition cursor-pointer">
                <div className="text-3xl mb-1">📸</div>
                <div className="text-gray-500 font-bold text-sm">Add completion photo(s)</div>
                <div className="text-gray-400 text-xs mt-1">Show the finished work clearly</div>
              </div>
              <div className="bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-xl p-5 text-center hover:border-yellow-400 transition cursor-pointer">
                <div className="text-3xl mb-1">🎥</div>
                <div className="text-yellow-700 font-bold text-sm">Add completion video (optional)</div>
                <div className="text-yellow-600 text-xs mt-1">Walk-through video builds trust</div>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 mb-6">
              ✅ Once submitted, the customer has 24 hours to approve. Funds auto-release if no response.
            </div>
            <div className="flex gap-3">
              <button onClick={() => setCompletionModal(null)} className="flex-1 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition">Cancel</button>
              <button
                onClick={() => { setCompletionModal(null); showNotification('Job marked complete! Customer has 24hrs to approve payment.'); }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition"
              >
                Submit & Request Payment 💰
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <span className="text-lg font-black text-gray-900">Serve Now</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveTab('browse')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-2 rounded-lg text-sm transition">🔍 Browse Jobs</button>
            <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-700 font-black text-sm">{provider.avatar}</span>
            </div>
          </div>
        </div>
      </div>

      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center font-black text-white text-2xl">{provider.avatar}</div>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h1 className="text-2xl font-black">{provider.name}</h1>
                {provider.verified && <span className="bg-emerald-500 text-white text-xs font-black px-2 py-1 rounded-full">✓ Verified</span>}
                <span className={`text-xs font-black px-2 py-1 rounded-full ${tierBadge[provider.tier]}`}>{provider.tier}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <span>⭐ {provider.rating} rating</span>
                <span>✅ {provider.completedJobs} jobs</span>
                <span>📍 {provider.city}</span>
              </div>
            </div>
          </div>
          <div className="bg-emerald-600 bg-opacity-20 border border-emerald-500 rounded-2xl px-6 py-4 text-center">
            <div className="text-emerald-300 text-xs font-bold mb-1">PENDING APPROVAL</div>
            <div className="text-3xl font-black text-white">$250</div>
            <div className="text-emerald-300 text-xs mt-1">Deep House Clean — 18hrs left</div>
          </div>
        </div>
      </div>

      {/* TABS */}
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

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Provider Overview</h2>
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
                  <button onClick={() => setActiveTab('myjobs')} className="text-emerald-600 text-sm font-bold hover:underline">View All →</button>
                </div>
                <div className="space-y-3">
                  {myJobs.filter(j => j.status !== 'Completed').map(job => (
                    <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${statusConfig[job.status]?.dot}`} />
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{job.title}</div>
                          <div className="text-xs text-gray-400">{job.status}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-emerald-600">${job.budget}</div>
                        <div className="text-xs text-gray-400">${(job.budget * 0.8).toFixed(0)} net</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab('browse')} className="mt-4 block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition text-sm">
                  🔍 Browse New Jobs
                </button>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-black text-gray-900 mb-4">Your Plan</h3>
                <div className={`border-2 rounded-xl p-5 mb-4 ${provider.tier === 'Elite' ? 'border-yellow-400 bg-yellow-50' : provider.tier === 'Pro' ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`font-black text-lg ${provider.tier === 'Elite' ? 'text-yellow-700' : provider.tier === 'Pro' ? 'text-emerald-700' : 'text-gray-700'}`}>
                      {provider.tier === 'Elite' ? '🏆 Elite Plan' : provider.tier === 'Pro' ? '⭐ Pro Plan' : '🔵 Basic Plan'}
                    </div>
                    <div className="font-black text-gray-900">{provider.tier === 'Elite' ? '$49/mo' : provider.tier === 'Pro' ? '$19/mo' : 'Free'}</div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    {provider.tier === 'Pro' && <>
                      <div className="flex items-center space-x-2"><span className="text-emerald-500">✓</span><span>Unlimited bids</span></div>
                      <div className="flex items-center space-x-2"><span className="text-emerald-500">✓</span><span>Instant payment release</span></div>
                      <div className="flex items-center space-x-2"><span className="text-emerald-500">✓</span><span>Priority in search results</span></div>
                    </>}
                  </div>
                </div>
                {provider.tier !== 'Elite' && (
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-black py-3 rounded-xl transition text-sm">
                    🏆 Upgrade to Elite — $49/mo
                  </button>
                )}
                <div className="mt-4 bg-gray-50 rounded-xl p-4">
                  <div className="text-sm font-bold text-gray-700 mb-2">This Month</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Gross earnings</span>
                    <span className="font-bold">$1,240</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Platform fee (20%)</span>
                    <span className="font-bold text-red-500">-$248</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1 pt-2 border-t border-gray-200">
                    <span className="font-black text-gray-900">Net earnings</span>
                    <span className="font-black text-emerald-600">$992</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BROWSE JOBS */}
        {activeTab === 'browse' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Available Jobs Near You</h2>
                <p className="text-gray-500 text-sm mt-1">Jobs matching your skills in {provider.city}</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-sm text-emerald-700 font-bold">
                {availableJobs.length} jobs available
              </div>
            </div>
            <div className="space-y-4">
              {availableJobs.map(job => (
                <div key={job.id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`text-xs font-black px-3 py-1 rounded-full ${categoryColors[job.category]}`}>{job.category}</span>
                        {job.urgent && <span className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded-full">🔥 URGENT</span>}
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-gray-500 text-sm mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span>📍 {job.city}</span>
                        <span>🕐 Posted {job.posted}</span>
                        <span>💬 {job.bids} bids so far</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-emerald-600">${job.budget}</div>
                      <div className="text-xs text-gray-400 mt-1">You keep ~${(job.budget * 0.8).toFixed(0)}</div>
                      <button
                        onClick={() => setBidModal(job)}
                        className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-2.5 rounded-xl transition text-sm w-full"
                      >
                        Bid on This Job →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MY JOBS */}
        {activeTab === 'myjobs' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">My Active & Past Jobs</h2>
            <div className="space-y-4">
              {myJobs.map(job => (
                <div key={job.id} className={`bg-white rounded-2xl border-2 p-6 transition ${job.status === 'Awaiting Customer Approval' ? 'border-yellow-300' : job.status === 'Disputed' ? 'border-red-200' : 'border-gray-100 hover:border-emerald-200'}`}>
                  {job.status === 'Awaiting Customer Approval' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-4">
                      <span className="text-yellow-700 font-black text-sm">⏰ Awaiting customer approval — {job.hoursLeft} hours until auto-release</span>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`text-xs font-black px-3 py-1 rounded-full ${categoryColors[job.category]}`}>{job.category}</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusConfig[job.status]?.color}`}>{job.status}</span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-1">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2">
                        <span>👤 Customer: {job.customer}</span>
                        <span>📍 {job.city}</span>
                        <span>📅 {job.scheduledDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-emerald-600">${job.budget}</div>
                      <div className="text-xs text-gray-400">Net: ${(job.budget * 0.8).toFixed(0)}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      {job.arrivalSubmitted
                        ? <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg">✅ Arrived</span>
                        : <button onClick={() => setArrivalModal(job)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-3 py-1.5 rounded-lg transition">📍 Check In</button>
                      }
                      {job.arrivalSubmitted && (
                        job.completionSubmitted
                          ? <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg">✅ Proof Submitted</span>
                          : <button onClick={() => setCompletionModal(job)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3 py-1.5 rounded-lg transition">🏁 Mark Complete</button>
                      )}
                    </div>
                    {job.status === 'Completed' && job.earned && (
                      <span className="bg-emerald-50 text-emerald-700 font-black text-sm px-4 py-2 rounded-xl border border-emerald-200">
                        💰 ${(job.budget * 0.8).toFixed(0)} Paid Out
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MY BIDS */}
        {activeTab === 'bids' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">My Submitted Bids</h2>
            <div className="space-y-4">
              {myBids.map(bid => (
                <div key={bid.id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-md transition p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusConfig[bid.status]?.color}`}>{bid.status}</span>
                        <span className="text-gray-400 text-xs">{bid.submitted}</span>
                      </div>
                      <h3 className="text-lg font-black text-gray-900">{bid.jobTitle}</h3>
                      <p className="text-gray-500 text-sm mt-1">Customer: {bid.customer}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-emerald-600">${bid.myBid}</div>
                      <div className="text-xs text-gray-400">of ${bid.jobBudget} budget</div>
                      <div className="text-xs text-gray-400 mt-1">Net: ~${(bid.myBid * 0.8).toFixed(0)}</div>
                    </div>
                  </div>
                  {bid.status === 'Accepted' && (
                    <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm text-emerald-800 font-bold">
                      🎉 Bid accepted! Check My Jobs to get started.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EARNINGS */}
        {activeTab === 'earnings' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Earnings Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-600 text-white rounded-2xl p-6 text-center">
                <div className="text-emerald-200 text-sm font-bold mb-2">Total Earned (Net)</div>
                <div className="text-4xl font-black">$4,184</div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
                <div className="text-gray-400 text-sm font-bold mb-2">Platform Fees Paid</div>
                <div className="text-4xl font-black text-red-500">$1,046</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
                <div className="text-yellow-700 text-sm font-bold mb-2">Pending Payout</div>
                <div className="text-4xl font-black text-yellow-700">$250</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-black text-gray-900">Monthly Earnings History</h3>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 font-bold text-gray-600">Month</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-600">Jobs</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-600">Gross</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-600">Fee (20%)</th>
                    <th className="text-left px-6 py-3 font-bold text-gray-600">Net Pay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {earnings.map(row => (
                    <tr key={row.month} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-bold text-gray-900">{row.month}</td>
                      <td className="px-6 py-4 text-gray-600">{row.jobs}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">${row.gross}</td>
                      <td className="px-6 py-4 text-red-500 font-bold">-${row.commission}</td>
                      <td className="px-6 py-4 font-black text-emerald-600">${row.net}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <h3 className="font-black text-emerald-800 mb-2">💡 Earn More with Pro or Elite</h3>
              <p className="text-emerald-700 text-sm">Pro members get instant payment release and priority job placement. Elite members get guaranteed top placement + Gold Shield badge that increases win rate by 40%.</p>
              <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3 rounded-xl transition text-sm">
                Upgrade My Plan →
              </button>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Notifications</h2>
            <div className="space-y-3">
              {notifications.map(notif => (
                <div key={notif.id} className={`bg-white rounded-2xl border p-5 flex items-start space-x-4 transition ${notif.unread ? 'border-emerald-200 bg-emerald-50' : 'border-gray-100'}`}>
                  <div className="text-2xl">
                    {notif.type === 'payment' ? '💰' : notif.type === 'bid' ? '💬' : notif.type === 'approval' ? '⏰' : notif.type === 'review' ? '⭐' : '📋'}
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

        {/* ACCOUNT */}
        {activeTab === 'account' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Account Settings</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-lg font-black text-gray-900 mb-5">Personal Info</h3>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">{provider.avatar}</div>
                    <div>
                      <div className="font-black text-gray-900">{provider.name}</div>
                      <div className="text-gray-400 text-sm">{provider.email}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tierBadge[provider.tier]}`}>{provider.tier} Provider</span>
                        {provider.verified && <span className="text-xs text-emerald-600 font-bold">✓ ID Verified</span>}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'First Name', value: 'Maria' },
                      { label: 'Last Name', value: 'Garcia' },
                      { label: 'Email', value: 'maria@email.com' },
                      { label: 'Phone', value: '(555) 987-6543' },
                      { label: 'Zip Code', value: '97601' },
                      { label: 'City', value: 'Klamath Falls, OR' },
                    ].map(field => (
                      <div key={field.label}>
                        <label className="block text-xs font-bold text-gray-500 mb-1">{field.label}</label>
                        <input type="text" defaultValue={field.value} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs font-bold text-gray-500 mb-2">Service Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {['Cleaning', 'Yard Care', 'Handyman', 'Junk Removal', 'Moving', 'Custom Task'].map(cat => (
                        <button key={cat} className={`text-xs font-bold px-3 py-1.5 rounded-full border transition ${provider.skills.includes(cat) ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-200 text-gray-600 hover:border-emerald-400'}`}>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => showNotification('Profile updated!')} className="mt-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3 rounded-xl transition text-sm">
                    Save Changes
                  </button>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-lg font-black text-gray-900 mb-4">ID Verification Status</h3>
                  {provider.verified ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center space-x-4">
                      <span className="text-4xl">✅</span>
                      <div>
                        <div className="font-black text-emerald-800">Identity Verified</div>
                        <div className="text-emerald-700 text-sm">Government ID + selfie on file. Verified Jan 2026.</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <div className="font-black text-yellow-800 mb-2">⚠️ Verification Required</div>
                      <p className="text-yellow-700 text-sm mb-3">Upload your government ID and take a live selfie to activate your account and start bidding.</p>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-black px-4 py-2 rounded-lg text-sm transition">Verify My Identity →</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h4 className="font-black text-gray-900 mb-3">Current Plan</h4>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-3">
                    <div className="font-black text-emerald-800">⭐ Pro Plan</div>
                    <div className="text-emerald-700 text-sm mt-1">$19/month</div>
                  </div>
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-black py-2.5 rounded-xl text-sm transition">
                    🏆 Upgrade to Elite
                  </button>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h4 className="font-black text-gray-900 mb-3">Quick Links</h4>
                  <div className="space-y-2">
                    <button onClick={() => setActiveTab('browse')} className="flex items-center justify-between w-full text-left px-4 py-3 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-medium text-sm transition">
                      <span>🔍 Browse Jobs</span><span>→</span>
                    </button>
                    <button onClick={() => setActiveTab('earnings')} className="flex items-center justify-between w-full text-left px-4 py-3 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-medium text-sm transition">
                      <span>💰 View Earnings</span><span>→</span>
                    </button>
                    <button className="flex items-center justify-between w-full text-left px-4 py-3 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-medium text-sm transition">
                      <span>💬 Contact Support</span><span>→</span>
                    </button>
                  </div>
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

export default ProviderDashboard;
