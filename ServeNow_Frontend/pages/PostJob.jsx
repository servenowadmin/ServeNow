import React from 'react';
import { useState } from 'react';

const PostJob = () => {
  const [form, setForm] = useState({
    title: '', category: '', zip: '', budget: ''
  });

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-2 text-emerald-900">Post a New Job</h1>
      <p className="text-gray-600 mb-8">Describe the task, set your budget, and get it handled.</p>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          className="w-full border rounded-lg p-3"
          onChange={e => setForm({...form, title: e.target.value})}
        />
        <select
          className="w-full border rounded-lg p-3"
          onChange={e => setForm({...form, category: e.target.value})}
        >
          <option>Select Category</option>
          <option>Cleaning</option>
          <option>Junk Removal</option>
          <option>Handyman</option>
          <option>Yard Care</option>
          <option>Custom Task</option>
        </select>
        <input
          type="text"
          placeholder="Zip Code"
          className="w-full border rounded-lg p-3"
          onChange={e => setForm({...form, zip: e.target.value})}
        />
        <input
          type="number"
          placeholder="Budget ($)"
          className="w-full border rounded-lg p-3"
          onChange={e => setForm({...form, budget: e.target.value})}
        />
        <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold">
          Post Job to Escrow
        </button>
      </div>
    </div>
  );
};

export default PostJob;
