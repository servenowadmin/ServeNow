import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { isLoggedIn, getRole } from '../api';

const Marketplace = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zip, setZip] = useState('');
  const [category, setCategory] = useState('');
  const categories = ['All Categories', 'Cleaning', 'Junk Removal', 'Handyman', 'Yard Care', 'Moving', 'Custom Task'];

  const categoryColors = {
    'Cleaning': 'bg-blue-100 text-blue-700',
    'Junk Removal': 'bg-orange-100 text-orange-700',
    'Handyman': 'bg-purple-100 text-purple-700',
    'Yard Care': 'bg-green-100 text-green-700',
    'Moving': 'bg-red-100 text-red-700',
    'Custom Task': 'bg-gray-100 text-gray-700',
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await api.getJobs(zip, category);
      if (Array.isArray(data)) setJobs(data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleSearch = () => fetchJobs();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-emerald-700 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">S</span>
              </div>
              <span className="text-white font-black text-lg">Serve Now</span>
            </Link>
            <div className="flex space-x-3">
              {isLoggedIn() ? (
                <Link to={getRole() === 'provider' ? '/dashboard/provider' : '/dashboard/customer'} className="bg-white text-emerald-700 font-black px-4 py-2 rounded-lg text-sm hover:bg-emerald-50 transition">
                  My Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-emerald-200 hover:text-white font-medium transition text-sm">Sign In</Link>
                  <Link to="/post-job" className="bg-white text-emerald-700 font-black px-4 py-2 rounded-lg text-sm hover:bg-emerald-50 transition">Post a Job</Link>
                </>
              )}
            </div>
          </div>
          <h1 className="text-4xl font-black mb-2">National Job Marketplace</h1>
          <p className="text-emerald-200 text-lg">Browse open jobs in your area. Bid and get paid.</p>
        </div>
      </div>
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="🔍 Search by zip code..."
              value={zip}
              onChange={e => setZip(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 flex-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-sm"
            />
            <select value={category} onChange={e => setCategory(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-sm bg-white">
              {categories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
            <button onClick={handleSearch} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl transition text-sm">
              Search
            </button>
          </div>
          <div className="mt-3 text-sm text-gray-500">
            {loading ? 'Loading jobs...' : <span>Showing <span className="font-bold text-gray-900">{jobs.length}</span> open jobs</span>}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-gray-500 font-bold">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-black text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500 mb-6">Be the first to post a job in this area!</p>
            <Link to="/post-job" className="bg-emerald-600 text-white font-black px-8 py-3 rounded-xl hover:bg-emerald-700 transition">Post the First Job →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <div key={job._id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition p-6 relative">
                {job.urgency === 'urgent' && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-full">🔥 URGENT</div>
                )}
                <div className="mb-3">
                  <span className={`text-xs font-black px-3 py-1 rounded-full ${categoryColors[job.category] || 'bg-gray-100 text-gray-700'}`}>{job.category}</span>
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2 pr-16">{job.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{job.description}</p>
                <div className="flex items-center text-sm text-gray-400 mb-4 space-x-3">
                  <span>📍 {job.city} {job.zip}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-2xl font-black text-emerald-600">${job.budget}</div>
                    <div className="text-xs text-gray-400">{job.bidCount || 0} bids placed</div>
                  </div>
                  <Link to={isLoggedIn() ? '/dashboard/provider' : '/signup'} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl transition text-sm">
                    {isLoggedIn() ? 'Bid Now →' : 'Sign Up to Bid →'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-12 bg-emerald-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-black mb-2">Want to post your own job?</h3>
          <p className="text-emerald-200 mb-6">Get bids from verified providers in your area within hours.</p>
          <Link to="/post-job" className="bg-white text-emerald-700 font-black px-8 py-3 rounded-xl hover:bg-emerald-50 transition inline-block">Post a Job — It's Free</Link>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
