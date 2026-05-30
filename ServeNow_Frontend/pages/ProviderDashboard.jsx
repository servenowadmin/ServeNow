import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { getEmail, getName, isLoggedIn, logout } from '../api';

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [jobs, setJobs] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [user, setUser] = useState({ firstName: '', lastName: '', email: getEmail() || '', phone: '', zip: '', city: '' });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const [bidModal, setBidModal] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidNote, setBidNote] = useState('');
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
      const [userData, bidsData, allJobs] = await Promise.all([
        api.getUser(email),
        api.getProviderBids(email),
        api.getJobs(),
      ]);
      if (userData && !userData.detail) setUser(userData);
      if (Array.isArray(bidsData)) setMyBids(bidsData);
      if (Array.isArray(allJobs)) setAvailableJobs(allJobs);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
    setLoading(false);
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const handleSubmitBid = async () => {
    if (!bidAmount || !bidNote) { showNotification('Please fill in bid amount and message.'); return; }
    try {
      const data = await api.submitBid({
        jobId: bidModal._id,
        providerEmail: user.email,
        providerName: `${user.firstName} ${user.lastName}`,
        amount: parseFloat(bidAmount),
        note: bidNote,
      });
      if (data.message) {
        showNotification(`Bid submitted on "${bidModal.title}"!`);
        setBidModal(null); setBidAmount(''); setBidNote('');
        loadData();
      }
    } catch (err) {
      showNotification('Failed to submit bid. Try again.');
    }
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const categoryColors = {
    'Cleaning': 'bg-blue-50 text-blue-700',
    'Junk Removal': 'bg-orange-50 text-orange-700',
    'Handyman': 'bg-purple-50 text-purple-700',
    'Yard Care': 'bg-green-50 text-green-700',
    'Moving': 'bg-red-50 text-red-700',
    'Custom Task': 'bg-gray-50 text-gray-700',
  };

  const displayName = user.firstName ? `${user.firstName} ${user.lastName}` : getName() || 'My Account';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const totalEarned = user.totalEarned || 0;
  const completedJobs = user.completedJobs || 0;
  const pendingBids = myBids.filter(b => b.status === 'pending').length;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'browse', label: 'Browse Jobs', icon: '🔍', badge: availableJobs.length },
    { id: 'bids', label: 'My Bids', icon: '💬', badge: pendingBids },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
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

      {bidModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-black text-gray-900 mb-1">Submit Your Bid</h3>
            <p className="text-gray-500 text-sm mb-6">"{bidModal.title}" — Budget: <span className="font-black text-emerald-600">${bidModal.budget}</span></p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Bid Amount ($)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input type="number" placeholder={bidModal.budget} value={bidAmount} onChange={e => setBidAmount(e.target.value)} className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message to Customer</label>
                <textarea placeholder="Introduce yourself, explain your experience and availability..." value={bidNote} onChange={e => setBidNote(e.target.value)} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none text-sm" />
              </div>
              {bidAmount && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm text-emerald-800">
                  <strong>Your take-home:</strong> ${(bidAmount * 0.80).toFixed(2)} after 20% platform commission
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setBidModal(null); setBidAmount(''); setBidNote(''); }} className="flex-1 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition">Cancel</button>
              <button onClick={handleSubmitBid} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition">Submit Bid →</button>
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
            <span className="text-xs bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full">🔧 Provider</span>
            <button onClick={() => setActiveTab('browse')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-2 rounded-lg text-sm transition">🔍 Browse Jobs</button>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 text-sm font-medium transition">Logout</button>
            <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-700 font-black text-sm">{initials}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center font-black text-white text-2xl">{initials}</div>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h1 className="text-2xl font-black">{displayName}</h1>
                {user.verified && <span className="bg-emerald-500 text-white text-xs font-black px-2 py-1 rounded-full">✓ Verified</span>}
                <span className="bg-emerald-100 text-emerald-700 text-xs font-black px-2 py-1 rounded-full capitalize">{user.tier || 'Basic'}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <span>⭐ {user.rating || '0.0'} rating</span>
                <span>✅ {completedJobs} jobs</span>
                <span>📍 {user.city || 'Location not set'}</span>
              </div>
            </div>
          </div>
          <div className="bg-emerald-600 bg-opacity-20 border border-emerald-500 rounded-2xl px-6 py-4 text-center">
            <div className="text-emerald-300 text-xs font-bold mb-1">TOTAL EARNED (NET)</div>
            <div className="text-3xl font-black text-white">${(totalEarned * 0.8).toFixed(2)}</div>
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
                {tab.badge > 0 && <span className="bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{tab.badge}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Provider Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Jobs Completed', value: completedJobs, icon: '✅', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Total Earned', value: `$${(totalEarned * 0.8).toFixed(0)}`, icon: '💰', color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { label: 'Active Bids', value: pendingBids, icon: '💬', color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Rating', value: `${user.rating || '0.0'}★`, icon: '⭐', color: 'text-orange-600', bg: 'bg-orange-50' },
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
                  <h3 className="text-lg font-black text-gray-900">Available Jobs Near You</h3>
                  <button onClick={() => setActiveTab('browse')} className="text-emerald-600 text-sm font-bold hover:underline">View All →</button>
                </div>
                {availableJobs.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="text-sm">No jobs available right now</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {availableJobs.slice(0, 3).map(job => (
                      <div key={job._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{job.title}</div>
                          <div className="text-xs text-gray-400">{job.city} {job.zip}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-emerald-600">${job.budget}</div>
                          <button onClick={() => setBidModal(job)} className="text-xs text-emerald-600 font-bold hover:underline">Bid →</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={() => setActiveTab('browse')} className="mt-4 block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition text-sm">
                  🔍 Browse All Jobs
                </button>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-black text-gray-900 mb-4">Your Plan</h3>
                <div className="border-2 border-emerald-200 bg-emerald-50 rounded-xl p-5 mb-4">
                  <div className="font-black text-emerald-800 text-lg capitalize">{user.tier || 'Basic'} Plan</div>
                  <div className="text-emerald-700 text-sm mt-1">{user.tier === 'elite' ? '$49/mo' : user.tier === 'pro' ? '$19/mo' : 'Free'}</div>
                </div>
                {user.tier !== 'elite' && (
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-black py-3 rounded-xl transition text-sm">
                    🏆 Upgrade to Elite — $49/mo
                  </button>
                )}
                <div className="mt-4 bg-gray-50 rounded-xl p-4">
                  <div className="text-sm font-bold text-gray-700 mb-2">Platform Commission</div>
                  <div className="text-xs text-gray-500">Serve Now takes 20% of each job. You keep 80%.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'browse' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Available Jobs</h2>
                <p className="text-gray-500 text-sm mt-1">Open jobs you can bid on</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-sm text-emerald-700 font-bold">
                {availableJobs.length} jobs available
              </div>
            </div>
            {availableJobs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-black text-gray-900 mb-2">No jobs available right now</h3>
                <p className="text-gray-500">Check back soon — new jobs are posted daily.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {availableJobs.map(job => (
                  <div key={job._id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`text-xs font-black px-3 py-1 rounded-full ${categoryColors[job.category] || 'bg-gray-100 text-gray-700'}`}>{job.category}</span>
                          {job.urgency === 'urgent' && <span className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded-full">🔥 URGENT</span>}
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">{job.title}</h3>
                        <p className="text-gray-500 text-sm mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <span>📍 {job.city} {job.zip}</span>
                          <span>💬 {job.bidCount || 0} bids so far</span>
                          {job.scheduledDate && <span>📅 {job.scheduledDate}</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-emerald-600">${job.budget}</div>
                        <div className="text-xs text-gray-400 mt-1">You keep ~${(job.budget * 0.8).toFixed(0)}</div>
                        <button onClick={() => setBidModal(job)} className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-2.5 rounded-xl transition text-sm w-full">
                          Bid on This Job →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'bids' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">My Submitted Bids</h2>
            {myBids.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-black text-gray-900 mb-2">No bids yet</h3>
                <p className="text-gray-500 mb-6">Browse available jobs and submit your first bid.</p>
                <button onClick={() => setActiveTab('browse')} className="bg-emerald-600 text-white font-black px-8 py-3 rounded-xl hover:bg-emerald-700 transition">Browse Jobs →</button>
              </div>
            ) : (
              <div className="space-y-4">
                {myBids.map(bid => (
                  <div key={bid._id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-md transition p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${bid.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' : bid.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                            {bid.status === 'accepted' ? '✅ Accepted' : bid.status === 'rejected' ? '❌ Rejected' : '⏳ Pending'}
                          </span>
                          <span className="text-gray-400 text-xs">{new Date(bid.submittedAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-lg font-black text-gray-900">Job #{bid.jobId?.slice(-6)}</h3>
                        <p className="text-gray-500 text-sm mt-1">{bid.note}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-emerald-600">${bid.amount}</div>
                        <div className="text-xs text-gray-400 mt-1">Net: ~${(bid.amount * 0.8).toFixed(0)}</div>
                      </div>
                    </div>
                    {bid.status === 'accepted' && (
                      <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm text-emerald-800 font-bold">
                        🎉 Bid accepted! Contact the customer to get started.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Earnings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-600 text-white rounded-2xl p-6 text-center">
                <div className="text-emerald-200 text-sm font-bold mb-2">Total Net Earned</div>
                <div className="text-4xl font-black">${(totalEarned * 0.8).toFixed(2)}</div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
                <div className="text-gray-400 text-sm font-bold mb-2">Jobs Completed</div>
                <div className="text-4xl font-black text-gray-900">{completedJobs}</div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
                <div className="text-gray-400 text-sm font-bold mb-2">Platform Fees Paid</div>
                <div className="text-4xl font-black text-red-500">${(totalEarned * 0.2).toFixed(2)}</div>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <h3 className="font-black text-emerald-800 mb-2">💡 Earn More</h3>
              <p className="text-emerald-700 text-sm">Upgrade to Pro or Elite to get priority placement in job listings and instant payment release.</p>
              <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3 rounded-xl transition text-sm">Upgrade My Plan →</button>
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
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full capitalize">{user.tier || 'Basic'} Provider</span>
                        {user.verified && <span className="text-xs text-emerald-600 font-bold">✓ ID Verified</span>}
                      </div>
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
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-lg font-black text-gray-900 mb-4">ID Verification</h3>
                  {user.verified ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center space-x-4">
                      <span className="text-4xl">✅</span>
                      <div>
                        <div className="font-black text-emerald-800">Identity Verified</div>
                        <div className="text-emerald-700 text-sm">Government ID on file.</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <div className="font-black text-yellow-800 mb-2">⚠️ Verification Required</div>
                      <p className="text-yellow-700 text-sm mb-3">Upload your government ID to activate bidding on jobs.</p>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-black px-4 py-2 rounded-lg text-sm transition">Verify My Identity →</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h4 className="font-black text-gray-900 mb-3">Current Plan</h4>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-3">
                    <div className="font-black text-emerald-800 capitalize">{user.tier || 'Basic'} Plan</div>
                  </div>
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-black py-2.5 rounded-xl text-sm transition">🏆 Upgrade to Elite</button>
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

export default ProviderDashboard;
