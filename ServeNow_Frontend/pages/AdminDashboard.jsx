import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [suspendEmail, setSuspendEmail] = useState('');
  const [heroText, setHeroText] = useState('Trusted Services. Delivered Nationwide.');
  const [heroSub, setHeroSub] = useState('Connect with verified local professionals. Secure escrow payments. One-strike accountability. No scams.');
  const [savedMessage, setSavedMessage] = useState('');

  const stats = [
    { label: 'Total Users', value: '0', icon: '👥', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Jobs', value: '0', icon: '📋', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Monthly Revenue', value: '$0.00', icon: '💰', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Active Disputes', value: '0', icon: '⚠️', color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Pending Verifications', value: '0', icon: '🆔', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Pro Subscribers', value: '0', icon: '⭐', color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const revenueStreams = [
    { name: '20% Job Commissions', amount: '$0.00', icon: '💼', desc: 'Platform cut from completed jobs' },
    { name: 'Pro Subscriptions', amount: '$0.00', icon: '⭐', desc: '$19/mo provider plans' },
    { name: 'Elite Subscriptions', amount: '$0.00', icon: '🏆', desc: '$49/mo Gold Shield plans' },
    { name: 'Featured Listings', amount: '$0.00', icon: '🔝', desc: 'Boosted job placement' },
    { name: 'Rush Job Fees', amount: '$0.00', icon: '🔥', desc: 'Urgent job premium' },
    { name: 'Tips (Platform Cut)', amount: '$0.00', icon: '🙏', desc: 'Provider tip processing' },
    { name: 'Referral Credits', amount: '$0.00', icon: '🤝', desc: 'Referral program revenue' },
  ];

  const mockUsers = [
    { id: 1, name: 'John Smith', email: 'john@email.com', role: 'Customer', status: 'Active', joined: 'Jan 1, 2026', jobs: 3 },
    { id: 2, name: 'Maria Garcia', email: 'maria@email.com', role: 'Provider', status: 'Active', joined: 'Jan 3, 2026', jobs: 12 },
    { id: 3, name: 'Bob Johnson', email: 'bob@email.com', role: 'Provider', status: 'Suspended', joined: 'Dec 28, 2025', jobs: 1 },
    { id: 4, name: 'Sarah Lee', email: 'sarah@email.com', role: 'Customer', status: 'Active', joined: 'Jan 5, 2026', jobs: 7 },
  ];

  const mockJobs = [
    { id: 1, title: 'Deep House Clean', customer: 'John Smith', provider: 'Maria Garcia', budget: 250, status: 'In Progress', posted: 'Jan 10, 2026' },
    { id: 2, title: 'Junk Removal', customer: 'Sarah Lee', provider: 'Pending', budget: 400, status: 'Open', posted: 'Jan 11, 2026' },
    { id: 3, title: 'Lawn Mowing', customer: 'John Smith', provider: 'Bob Johnson', budget: 80, status: 'Disputed', posted: 'Jan 8, 2026' },
    { id: 4, title: 'TV Mount Install', customer: 'Sarah Lee', provider: 'Maria Garcia', budget: 120, status: 'Completed', posted: 'Jan 6, 2026' },
  ];

  const mockDisputes = [
    {
      id: 1,
      job: 'Lawn Mowing',
      customer: 'John Smith',
      provider: 'Bob Johnson',
      amount: '$80.00',
      issue: 'Customer claims lawn was not fully mowed. Provider submitted completion photos showing finished work.',
      customerEvidence: true,
      providerEvidence: true,
      opened: 'Jan 9, 2026',
    },
  ];

  const handleSuspend = () => {
    if (!suspendEmail) return;
    alert(`User ${suspendEmail} has been suspended. One-strike policy enforced.`);
    setSuspendEmail('');
  };

  const handleSaveContent = () => {
    setSavedMessage('✅ Content saved successfully! Changes are live.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'jobs', label: 'Jobs', icon: '📋' },
    { id: 'disputes', label: 'Disputes', icon: '⚖️' },
    { id: 'revenue', label: 'Revenue', icon: '💰' },
    { id: 'content', label: 'Content', icon: '✏️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const statusColors = {
    'Active': 'bg-emerald-100 text-emerald-700',
    'Suspended': 'bg-red-100 text-red-700',
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Open': 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-purple-100 text-purple-700',
    'Completed': 'bg-emerald-100 text-emerald-700',
    'Disputed': 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOP BAR */}
      <div className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">S</span>
              </div>
              <span className="text-white font-black text-lg">Serve Now</span>
            </Link>
            <span className="text-gray-500">|</span>
            <span className="text-emerald-400 font-bold text-sm">Admin Command Center</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">servenowadmin@gmail.com</span>
            <Link to="/" className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition">
              View Site →
            </Link>
          </div>
        </div>
      </div>

      {/* TAB NAV */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
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
                {tab.id === 'disputes' && mockDisputes.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {mockDisputes.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-8">Platform Overview</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {stats.map(stat => (
                <div key={stat.label} className={`${stat.bg} rounded-2xl p-6 border border-opacity-20`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                  <div className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-black text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button onClick={() => setActiveTab('users')} className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-medium text-sm transition flex items-center justify-between">
                    <span>👥 Manage Users</span><span>→</span>
                  </button>
                  <button onClick={() => setActiveTab('disputes')} className="w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-medium text-sm transition flex items-center justify-between">
                    <span>⚖️ Review Open Disputes ({mockDisputes.length})</span><span>→</span>
                  </button>
                  <button onClick={() => setActiveTab('revenue')} className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-medium text-sm transition flex items-center justify-between">
                    <span>💰 View Revenue Breakdown</span><span>→</span>
                  </button>
                  <button onClick={() => setActiveTab('content')} className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-medium text-sm transition flex items-center justify-between">
                    <span>✏️ Edit Site Content</span><span>→</span>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-black text-gray-900 mb-4">Platform Health</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Stripe Connected', status: false },
                    { label: 'MongoDB Connected', status: false },
                    { label: 'Cloudinary Connected', status: false },
                    { label: 'Email Service Connected', status: false },
                    { label: 'Frontend Live', status: true },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.status ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.status ? '✓ Connected' : '⚠ Not Connected'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-black text-gray-900">User Management</h1>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                <input
                  type="email"
                  placeholder="user@email.com"
                  value={suspendEmail}
                  onChange={e => setSuspendEmail(e.target.value)}
                  className="border border-red-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 w-52"
                />
                <button
                  onClick={handleSuspend}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition"
                >
                  🚫 Suspend User
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-4 font-bold text-gray-600">User</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-600">Role</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-600">Status</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-600">Jobs</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-600">Joined</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{user.name}</div>
                        <div className="text-gray-400 text-xs">{user.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${user.role === 'Provider' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[user.status]}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-700">{user.jobs}</td>
                      <td className="px-6 py-4 text-gray-500">{user.joined}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-3 py-1.5 rounded-lg transition">View</button>
                          <button className="text-xs bg-red-100 hover:bg-red-200 text-red-700 font-bold px-3 py-1.5 rounded-lg transition">Suspend</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-8">All Jobs</h1>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-4 font-bold text-gray-600">Job</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-600">Customer</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-600">Provider</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-600">Budget</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-600">Status</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-600">Posted</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockJobs.map(job => (
                    <tr key={job.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-bold text-gray-900">{job.title}</td>
                      <td className="px-6 py-4 text-gray-600">{job.customer}</td>
                      <td className="px-6 py-4 text-gray-600">{job.provider}</td>
                      <td className="px-6 py-4 font-bold text-emerald-600">${job.budget}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[job.status]}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{job.posted}</td>
                      <td className="px-6 py-4">
                        <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-3 py-1.5 rounded-lg transition">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DISPUTES TAB */}
        {activeTab === 'disputes' && (
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-8">Dispute Resolution Center</h1>
            {mockDisputes.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <div className="text-6xl mb-4">⚖️</div>
                <h3 className="text-xl font-black text-gray-900 mb-2">No open disputes</h3>
                <p className="text-gray-500">All clear! No disputes need your attention right now.</p>
              </div>
            ) : (
              mockDisputes.map(dispute => (
                <div key={dispute.id} className="bg-white rounded-2xl border-2 border-red-200 p-8 mb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-red-100 text-red-700 text-xs font-black px-3 py-1 rounded-full">⚠️ OPEN DISPUTE</span>
                        <span className="text-gray-400 text-sm">Opened {dispute.opened}</span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900">Job: {dispute.job}</h3>
                    </div>
                    <div className="text-2xl font-black text-emerald-600">{dispute.amount}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-blue-700 font-black text-sm mb-1">👤 Customer</div>
                      <div className="text-gray-900 font-bold">{dispute.customer}</div>
                      <div className="text-xs text-gray-500 mt-2">Evidence submitted: {dispute.customerEvidence ? '✅ Yes' : '❌ No'}</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <div className="text-purple-700 font-black text-sm mb-1">🔧 Provider</div>
                      <div className="text-gray-900 font-bold">{dispute.provider}</div>
                      <div className="text-xs text-gray-500 mt-2">Evidence submitted: {dispute.providerEvidence ? '✅ Yes' : '❌ No'}</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="text-sm font-bold text-gray-700 mb-2">Dispute Summary:</div>
                    <p className="text-gray-600 text-sm">{dispute.issue}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition">
                      ✅ Release Funds to Provider
                    </button>
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl transition">
                      🔄 Refund Customer
                    </button>
                    <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-black py-3 rounded-xl transition">
                      ✂️ Split 50/50
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* REVENUE TAB */}
        {activeTab === 'revenue' && (
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-8">Revenue Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-600 text-white rounded-2xl p-6">
                <div className="text-emerald-200 text-sm font-bold mb-2">Total Revenue (All Time)</div>
                <div className="text-4xl font-black">$0.00</div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="text-gray-500 text-sm font-bold mb-2">This Month</div>
                <div className="text-4xl font-black text-gray-900">$0.00</div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="text-gray-500 text-sm font-bold mb-2">Pending Escrow</div>
                <div className="text-4xl font-black text-yellow-600">$0.00</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-black text-gray-900">Revenue by Stream</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {revenueStreams.map(stream => (
                  <div key={stream.name} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{stream.icon}</span>
                      <div>
                        <div className="font-bold text-gray-900">{stream.name}</div>
                        <div className="text-xs text-gray-400">{stream.desc}</div>
                      </div>
                    </div>
                    <div className="font-black text-emerald-600 text-lg">{stream.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTENT TAB */}
        {activeTab === 'content' && (
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-8">Edit Site Content</h1>
            {savedMessage && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl mb-6 font-bold">
                {savedMessage}
              </div>
            )}
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <h3 className="text-lg font-black text-gray-900 mb-6">🦸 Hero Section</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Main Headline</label>
                    <input
                      type="text"
                      value={heroText}
                      onChange={e => setHeroText(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Subheadline</label>
                    <textarea
                      value={heroSub}
                      onChange={e => setHeroSub(e.target.value)}
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <h3 className="text-lg font-black text-gray-900 mb-6">💰 Platform Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Commission Rate (%)</label>
                    <input type="number" defaultValue="20" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Pro Plan Price ($/mo)</label>
                    <input type="number" defaultValue="19" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Elite Plan Price ($/mo)</label>
                    <input type="number" defaultValue="49" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Dispute Window (hours)</label>
                    <input type="number" defaultValue="24" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                  </div>
                </div>
              </div>
              <button
                onClick={handleSaveContent}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl transition text-lg"
              >
                💾 Save All Changes
              </button>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-8">API & Integration Settings</h1>
            <div className="space-y-6">
              {[
                { name: 'Stripe Secret Key', placeholder: 'sk_live_...', icon: '💳', desc: 'Required for payments and escrow' },
                { name: 'MongoDB Connection URL', placeholder: 'mongodb+srv://...', icon: '🗄️', desc: 'Required for database storage' },
                { name: 'Cloudinary Cloud Name', placeholder: 'your-cloud-name', icon: '☁️', desc: 'Required for photo/ID uploads' },
                { name: 'Cloudinary API Key', placeholder: 'your-api-key', icon: '🔑', desc: 'Required for photo/ID uploads' },
                { name: 'JWT Secret Key', placeholder: 'your-secret-key-min-32-chars', icon: '🔒', desc: 'Required for user authentication' },
                { name: 'Admin Email', placeholder: 'servenowadmin@gmail.com', icon: '📧', desc: 'Receives platform notifications' },
              ].map(setting => (
                <div key={setting.name} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-start space-x-4">
                    <span className="text-3xl">{setting.icon}</span>
                    <div className="flex-1">
                      <label className="block text-sm font-black text-gray-900 mb-1">{setting.name}</label>
                      <p className="text-xs text-gray-400 mb-3">{setting.desc}</p>
                      <input
                        type="password"
                        placeholder={setting.placeholder}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl transition text-lg">
                💾 Save API Settings
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
