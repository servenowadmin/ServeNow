import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <header className="p-6 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold text-emerald-600">SERVE NOW</h1>
        <Link to="/login" className="bg-emerald-600 text-white px-4 py-2 rounded">Sign In</Link>
      </header>

## The Trusted National Marketplace for Local Work.

Secure Escrow. Verified Providers. No Scams.

Post a Job Now Find Work

© 2026 Serve Now. The National Standard for Local Work.

); };

export default LandingPage;
