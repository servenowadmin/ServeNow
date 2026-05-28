import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    zip: '',
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!form.agreeTerms) {
      setError('You must agree to the Terms of Service.');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setError('Backend not connected yet. Coming soon!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6">
      <div className="max-w-lg mx-auto w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-2xl">S</span>
            </div>
            <span className="text-2xl font-black text-gray-900">Serve Now</span>
          </Link>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-500">Join thousands of customers and providers</p>
        </div>

        {/* STEP INDICATOR */}
        <div className="flex items-center justify-center mb-8 space-x-4">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-emerald-600' : 'text-gray-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'}`}>1</div>
            <span className="text-sm font-bold hidden sm:block">Choose Role</span>
          </div>
          <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-emerald-600' : 'bg-gray-200'}`} />
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-emerald-600' : 'text-gray-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'}`}>2</div>
            <span className="text-sm font-bold hidden sm:block">Your Info</span>
          </div>
          <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-emerald-600' : 'bg-gray-200'}`} />
          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-emerald-600' : 'text-gray-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'}`}>3</div>
            <span className="text-sm font-bold hidden sm:block">Verify</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {/* STEP 1 — ROLE SELECTION */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-2 text-center">I want to...</h2>
              <p className="text-gray-500 text-center text-sm mb-8">Choose how you'll use Serve Now</p>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => handleRoleSelect('customer')}
                  className="border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 rounded-2xl p-6 text-left transition group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">🏠</div>
                    <div>
                      <div className="font-black text-gray-900 text-lg group-hover:text-emerald-700">I Need Work Done</div>
                      <div className="text-gray-500 text-sm mt-1">Post jobs and hire verified local providers</div>
                    </div>
                    <div className="ml-auto text-gray-300 group-hover:text-emerald-500 text-2xl">→</div>
                  </div>
                </button>
                <button
                  onClick={() => handleRoleSelect('provider')}
                  className="border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 rounded-2xl p-6 text-left transition group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">🔧</div>
                    <div>
                      <div className="font-black text-gray-900 text-lg group-hover:text-emerald-700">I Want to Find Work</div>
                      <div className="text-gray-500 text-sm mt-1">Browse jobs and get paid for your skills</div>
                    </div>
                    <div className="ml-auto text-gray-300 group-hover:text-emerald-500 text-2xl">→</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — ACCOUNT INFO */}
          {step === 2 && (
            <div>
              <div className="flex items-center mb-6">
                <button onClick={() => setStep(1)} className="text-gray-400 hover:text-gray-600 mr-4 text-sm">← Back</button>
                <div>
                  <h2 className="text-xl font-black text-gray-900">Your Information</h2>
                  <p className="text-emerald-600 text-sm font-bold capitalize">{role === 'customer' ? '🏠 Customer Account' : '🔧 Provider Account'}</p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      placeholder="John"
                      value={form.firstName}
                      onChange={e => setForm({ ...form, firstName: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      placeholder="Smith"
                      value={form.lastName}
                      onChange={e => setForm({ ...form, lastName: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Zip Code *</label>
                  <input
                    type="text"
                    placeholder="97601"
                    value={form.zip}
                    onChange={e => setForm({ ...form, zip: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    placeholder="Repeat your password"
                    value={form.confirmPassword}
                    onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.agreeTerms}
                      onChange={e => setForm({ ...form, agreeTerms: e.target.checked })}
                      className="mt-1 w-4 h-4 text-emerald-600"
                    />
                    <span className="text-xs text-gray-600 leading-relaxed">
                      I agree to the <a href="#" className="text-emerald-600 font-bold">Terms of Service</a> and <a href="#" className="text-emerald-600 font-bold">Privacy Policy</a>. I understand that Serve Now is a neutral third-party platform. Providers are independent contractors, not employees of Serve Now. Serve Now is not liable for any damages, injuries, or disputes arising from services performed.
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-black py-4 rounded-xl transition text-lg"
                >
                  {loading ? 'Creating Account...' : 'Create My Account →'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-600 font-bold hover:text-emerald-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
