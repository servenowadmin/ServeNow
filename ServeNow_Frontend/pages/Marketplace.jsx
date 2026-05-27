import React, { useState } from 'react';

const Marketplace = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Test Job: Yard Cleanup', budget: 150, zip: '97601', category: 'Yard Care' }
  ]);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-emerald-900">National Job Marketplace</h1>
          <div className="flex space-x-4">
            <input type="text" placeholder="Zip Code..." className="border rounded-lg p-2 w-32" />
            <select className="border rounded-lg p-2">
              <option>All Categories</option>
              <option>Cleaning</option>
              <option>Junk Removal</option>
            </select>
          </div>
        </div>

{jobs.map(job => ( 

{job.category}

### {job.title}

Location: {job.zip}

${job.budget}

View & Bid

))} 

); };

export default Marketplace;
