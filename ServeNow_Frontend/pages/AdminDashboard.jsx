import React, { useState } from 'react';

const AdminDashboard = () => {
  const [stripeKey, setStripeKey] = useState('');

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Command Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <p className="text-sm text-gray-500 uppercase font-bold">Total Revenue</p>
          <p className="text-2xl font-bold text-emerald-600">$0.00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <p className="text-sm text-gray-500 uppercase font-bold">Active Disputes</p>
          <p className="text-2xl font-bold text-red-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <p className="text-sm text-gray-500 uppercase font-bold">Pending Verifications</p>
          <p className="text-2xl font-bold text-blue-600">0</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-bold mb-4">Platform Settings</h2>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stripe Secret Key
        </label>
        <input
          type="password"
          value={stripeKey}
          onChange={e => setStripeKey(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="sk_live_..."
        />
        <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold">
          Save API Settings
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
