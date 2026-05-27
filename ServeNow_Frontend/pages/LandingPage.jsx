import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <header className="p-6 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold text-emerald-600">SERVE NOW</h1>
        <Link to="/post-job" className="bg-emerald-600 text-white px-4 py-2 rounded">
          Sign In
        </Link>
      </header>
      <main className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          The Trusted National Marketplace for Local Work.
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Secure Escrow. Verified Providers. No Scams.
        </p>
        <div className="flex space-x-4">
          <Link to="/post-job" className="bg-emerald-600 text-white px-6 py-3 rounded-lg">
            Post a Job Now
          </Link>
          <Link to="/marketplace" className="border border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg">
            Find Work
          </Link>
        </div>
      </main>
      <footer className="text-center p-6 text-gray-400 text-sm">
        © 2026 Serve Now. The National Standard for Local Work.
      </footer>
    </div>
  );
};

export default LandingPage;
