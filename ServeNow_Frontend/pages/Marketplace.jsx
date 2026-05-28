import React, { useState } from 'react';

const Marketplace = () => {
  const [zipFilter, setZipFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [jobs] = useState([
    { id: 1, title: 'Yard Cleanup', budget: 150, zip: '97601', category: 'Yard Care' },
    { id: 2, title: 'House Cleaning', budget: 120, zip: '97601', category: 'Cleaning' },
    { id: 3, title: 'Junk Removal', budget: 200, zip: '90210', category: 'Junk Removal' },
  ]);

  const filtered = jobs.filter(job => {
    return (
      (zipFilter === '' || job.zip.includes(zipFilter)) &&
      (categoryFilter === '' || job.category === categoryFilter)
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-emerald-900">
            National Job Marketplace
          </h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Zip Code..."
              className="border rounded-lg p-2 w-32"
              onChange={e => setZipFilter(e.target.value)}
            />
            <select
              className="border rounded-lg p-2"
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option>Cleaning</option>
              <option>Junk Removal</option>
              <option>Handyman</option>
              <option>Yard Care</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(job => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm border p-6">
              <span className="text-xs font-bold text-emerald-600 uppercase">
                {job.category}
              </span>
              <h3 className="text-xl font-bold mt-1 mb-2">{job.title}</h3>
              <p className="text-gray-500 text-sm mb-4">Zip: {job.zip}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-emerald-600">
                  ${job.budget}
                </span>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
                  View & Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
