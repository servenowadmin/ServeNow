import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  const [zip, setZip] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');

  const jobs = [
    { id: 1, title: 'Full House Deep Clean', category: 'Cleaning', budget: 250, zip: '97601', city: 'Klamath Falls, OR', posted: '2 hours ago', bids: 3, urgent: false, description: 'Need a full deep clean of 3 bedroom 2 bath house. Move-out clean required.' },
    { id: 2, title: 'Garage Junk Removal', category: 'Junk Removal', budget: 400, zip: '90210', city: 'Beverly Hills, CA', posted: '4 hours ago', bids: 7, urgent: true, description: 'Full garage cleanout. Large furniture, old appliances, general junk. Need haul away.' },
    { id: 3, title: 'Lawn Mowing Weekly', category: 'Yard Care', budget: 80, zip: '73301', city: 'Austin, TX', posted: '1 hour ago', bids: 5, urgent: false, description: 'Weekly lawn mowing for medium sized yard. Front and back. Edging included.' },
    { id: 4, title: 'TV Wall Mount Install', category: 'Handyman', budget: 120, zip: '30301', city: 'Atlanta, GA', posted: '30 min ago', bids: 2, urgent: false, description: '65 inch TV needs to be mounted on drywall. Studs need to be located. Wires hidden.' },
    { id: 5, title: 'Moving Help — 2 Bedroom', category: 'Moving', budget: 350, zip: '60601', city: 'Chicago, IL', posted: '5 hours ago', bids: 9, urgent: true, description: 'Need 2 strong movers for Saturday. 2 bedroom apartment to new place 10 miles away.' },
    { id: 6, title: 'Fence Repair', category: 'Handyman', budget: 200, zip: '85001', city: 'Phoenix, AZ', posted: '3 hours ago', bids: 4, urgent: false, description: '3 fence panels damaged in storm. Need replacement boards and paint to match.' },
    { id: 7, title: 'Office Cleaning 3x Week', category: 'Cleaning', budget: 600, zip: '10001', city: 'New York, NY', posted: '1 day ago', bids: 12, urgent: false, description: 'Small office 1500 sqft needs cleaning Monday, Wednesday, Friday. Supplies provided.' },
    { id: 8, title: 'Tree Trimming', category: 'Yard Care', budget: 300, zip: '98101', city: 'Seattle, WA', posted: '6 hours ago', bids: 3, urgent: false, description: 'Two large trees need trimming. Branches hanging over roof. Debris removal included.' },
  ];

  const categories = ['All Categories', 'Cleaning', 'Junk Removal', 'Handyman', 'Yard Care', 'Moving', 'Custom Task'];

  const filtered = jobs.filter(job => {
    const matchZip = zip === '' || job.zip.includes(zip) || job.city.toLowerCase().includes(zip.toLowerCase());
    const matchCat = category === '' || category === 'All Categories' || job.category === category;
    return matchZip && matchCat;
  });

  const categoryColors = {
    'Cleaning': 'bg-blue-100 text-blue-700',
    'Junk Removal': 'bg-orange-100 text-orange-700',
    'Handyman': 'bg-purple-100 text-purple-700',
    'Yard Care': 'bg-green-100 text-green-700',
    'Moving': 'bg-red-100 text-red-700',
    'Custom Task': 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
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
              <Link to="/login" className="text-emerald-200 hover:text-white font-medium transition text-sm">Sign In</Link>
              <Link to="/post-job" className="bg-white text-emerald-700 font-black px-4 py-2 rounded-lg text-sm hover:bg-emerald-50 transition">Post a Job</Link>
            </div>
          </div>
          <h1 className="text-4xl font-black mb-2">National Job Marketplace</h1>
          <p className="text-emerald-200 text-lg">Browse open jobs in your area. Bid and get paid.</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="🔍 Search by zip code or city..."
              value={zip}
              onChange={e => setZip(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 flex-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-sm"
            />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-sm bg-white"
            >
              {categories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-sm bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="budget_high">Highest Budget</option>
              <option value="budget_low">Lowest Budget</option>
              <option value="most_bids">Most Bids</option>
            </select>
          </div>
          <div className="mt-3 text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">{filtered.length}</span> open jobs
          </div>
        </div>
      </div>

      {/* JOB LISTINGS */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-black text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try a different zip code or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(job => (
              <div key={job.id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition p-6 relative">
                {job.urgent && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-full">
                    🔥 URGENT
                  </div>
                )}
                <div className="mb-3">
                  <span className={`text-xs font-black px-3 py-1 rounded-full ${categoryColors[job.category] || 'bg-gray-100 text-gray-700'}`}>
                    {job.category}
                  </span>
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2 pr-16">{job.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{job.description}</p>
                <div className="flex items-center text-sm text-gray-400 mb-4 space-x-3">
                  <span>📍 {job.city}</span>
                  <span>•</span>
                  <span>🕐 {job.posted}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-2xl font-black text-emerald-600">${job.budget}</div>
                    <div className="text-xs text-gray-400">{job.bids} bids placed</div>
                  </div>
                  <Link to="/signup" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl transition text-sm">
                    View & Bid →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BOTTOM CTA */}
        <div className="mt-12 bg-emerald-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-black mb-2">Want to post your own job?</h3>
          <p className="text-emerald-200 mb-6">Get bids from verified providers in your area within hours.</p>
          <Link to="/post-job" className="bg-white text-emerald-700 font-black px-8 py-3 rounded-xl hover:bg-emerald-50 transition inline-block">
            Post a Job — It's Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
