import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { isLoggedIn, getEmail } from '../api';

const PostJob = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '', category: '', description: '', zip: '', city: '',
    budget: '', budgetType: 'fixed', urgency: 'normal',
    scheduledDate: '', scheduledTime: '',
    firstName: '', lastName: '', email: getEmail() || '', phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [jobId, setJobId] = useState('');
  const navigate = useNavigate();

  const categories = [
    { value: 'Cleaning', icon: '🧹', desc: 'Home & office cleaning' },
    { value: 'Junk Removal', icon: '🚛', desc: 'Haul away & disposal' },
    { value: 'Handyman', icon: '🔧', desc: 'Repairs & installs' },
    { value: 'Yard Care', icon: '🌿', desc: 'Lawn & garden' },
    { value: 'Moving', icon: '📦', desc: 'Local moving help' },
    { value: 'Custom Task', icon: '✨', desc: 'Something else' },
  ];

  const validateStep = () => {
    setError('');
    if (step === 1 && !form.category) { setError('Please select a category.'); return false; }
    if (step === 2 && (!form.title || !form.description || !form.zip || !form.budget)) { setError('Please fill in all required fields.'); return false; }
    if (step === 3 && (!form.firstName || !form.lastName || !form.email || !form.phone)) { setError('Please fill in all required fields.'); return false; }
    return true;
  };

  const nextStep = () => { if (validateStep()) setStep(step + 1); };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    try {
      const jobData = {
        title: form.title,
        category: form.category,
        description: form.description,
        zip: form.zip,
        city: form.city,
        budget: parseFloat(form.budget),
        budgetType: form.budgetType,
        urgency: form.urgency,
        scheduledDate: form.scheduledDate,
        scheduledTime: form.scheduledTime,
        customerEmail: form.email,
      };
      const data = await api.postJob(jobData);
      if (data.id) {
        setJobId(data.id);
        setSubmitted(true);
      } else {
        setError(data.detail || 'Failed to post job. Please try again.');
      }
    } catch (err) {
      setError('Cannot connect to server. Please try again.');
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12">
            <div className="text-7xl mb-6">🎉</div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Job Posted!</h2>
            <p className="text-gray-500 mb-2">Your job is now live on the marketplace.</p>
            <p className="text-gray-500 mb-8">Verified providers will start bidding shortly.</p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-8">
              <div className="text-emerald-700 font-bold text-sm">💰 Your payment is protected</div>
              <div className="text-emerald-600 text-xs mt-1">Funds only released when YOU approve the completed work.</div>
            </div>
            <div className="space-y-3">
              {isLoggedIn() ? (
                <button onClick={() => navigate('/dashboard/customer')} className="block w-full bg-emerald-600 text-white font-black py-3 rounded-xl hover:bg-emerald-700 transition">
                  View My Dashboard →
                </button>
              ) : (
                <Link to="/signup" className="block w-full bg-emerald-600 text-white font-black py-3 rounded-xl hover:bg-emerald-700 transition">
                  Create Account to Track Job →
                </Link>
              )}
              <Link to="/marketplace" className="block w-full border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition">Browse Marketplace</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <span className="text-lg font-black text-gray-900">Serve Now</span>
          </Link>
          {isLoggedIn() ? (
            <Link to="/dashboard/customer" className="text-emerald-600 font-bold text-sm hover:text-emerald-700 transition">My Dashboard</Link>
          ) : (
            <Link to="/login" className="text-emerald-600 font-bold text-sm hover:text-emerald-700 transition">Sign In</Link>
          )}
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center justify-center mb-10 space-x-2">
          {['Category', 'Job Details', 'Contact', 'Review'].map((label, i) => (
            <React.Fragment key={label}>
              <div className={`flex items-center space-x-2 ${step >= i + 1 ? 'text-emerald-600' : 'text-gray-300'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition ${step > i + 1 ? 'bg-emerald-600 text-white' : step === i + 1 ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' : 'bg-gray-200 text-gray-400'}`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className="text-xs font-bold hidden sm:block">{label}</span>
              </div>
              {i < 3 && <div className={`w-6 h-0.5 transition ${step > i + 1 ? 'bg-emerald-600' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm font-medium">{error}</div>}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">What do you need done?</h2>
              <p className="text-gray-500 mb-8">Select the category that best fits your job</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map(cat => (
                  <button key={cat.value} onClick={() => setForm({ ...form, category: cat.value })} className={`border-2 rounded-2xl p-5 text-center transition hover:border-emerald-500 hover:bg-emerald-50 ${form.category === cat.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}>
                    <div className="text-4xl mb-2">{cat.icon}</div>
                    <div className={`font-black text-sm ${form.category === cat.value ? 'text-emerald-700' : 'text-gray-900'}`}>{cat.value}</div>
                    <div className="text-xs text-gray-400 mt-1">{cat.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Tell us about the job</h2>
              <p className="text-gray-500 mb-8">The more detail you provide, the better bids you'll get</p>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Job Title *</label>
                  <input type="text" placeholder={`e.g. "Deep clean 3 bedroom house"`} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                  <textarea placeholder="Describe exactly what needs to be done, special requirements, access instructions..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Zip Code *</label>
                    <input type="text" placeholder="97601" value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                    <input type="text" placeholder="Klamath Falls" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Budget *</label>
                  <div className="flex gap-3 mb-3">
                    <button onClick={() => setForm({ ...form, budgetType: 'fixed' })} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${form.budgetType === 'fixed' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Fixed Price</button>
                    <button onClick={() => setForm({ ...form, budgetType: 'hourly' })} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${form.budgetType === 'hourly' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Hourly Rate</button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">$</span>
                    <input type="number" placeholder="0.00" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Urgency</label>
                  <div className="flex gap-3">
                    {[{ value: 'normal', label: '📅 Normal', desc: 'Within a week' }, { value: 'soon', label: '⚡ Soon', desc: '48 hours' }, { value: 'urgent', label: '🔥 Urgent', desc: 'Today/Tomorrow' }].map(opt => (
                      <button key={opt.value} onClick={() => setForm({ ...form, urgency: opt.value })} className={`flex-1 border-2 rounded-xl p-3 text-center transition ${form.urgency === opt.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="text-sm font-bold text-gray-900">{opt.label}</div>
                        <div className="text-xs text-gray-400">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Date</label>
                    <input type="date" value={form.scheduledDate} onChange={e => setForm({ ...form, scheduledDate: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Time</label>
                    <select value={form.scheduledTime} onChange={e => setForm({ ...form, scheduledTime: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition bg-white">
                      <option value="">Any time</option>
                      <option>Morning (8am - 12pm)</option>
                      <option>Afternoon (12pm - 5pm)</option>
                      <option>Evening (5pm - 8pm)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Your Contact Info</h2>
              <p className="text-gray-500 mb-8">Providers will use this to reach you about your job</p>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                    <input type="text" placeholder="John" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                    <input type="text" placeholder="Smith" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                  <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                  <input type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🔒</span>
                    <div>
                      <div className="font-bold text-emerald-800 text-sm">Your payment is protected</div>
                      <div className="text-emerald-700 text-xs mt-1">Money held in escrow. Released only when YOU approve the completed work.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Review Your Job</h2>
              <p className="text-gray-500 mb-8">Make sure everything looks correct before posting</p>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-3">
                {[
                  { label: 'Category', value: form.category },
                  { label: 'Job Title', value: form.title },
                  { label: 'Budget', value: `$${form.budget} ${form.budgetType === 'hourly' ? '/hr' : 'fixed'}` },
                  { label: 'Location', value: `${form.city} ${form.zip}` },
                  { label: 'Urgency', value: form.urgency },
                  { label: 'Contact', value: `${form.firstName} ${form.lastName}` },
                  { label: 'Email', value: form.email },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">{item.label}</span>
                    <span className="font-bold text-gray-900">{item.value}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-200">
                  <div className="text-gray-500 font-medium text-sm mb-1">Description</div>
                  <div className="text-gray-700 text-sm">{form.description}</div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4 text-sm text-yellow-800">
                <span className="font-bold">⚠️ Note:</span> By posting this job you agree Serve Now is a neutral third-party platform. Payment collected at escrow when provider is selected.
              </div>
            </div>
          )}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="px-6 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition">← Back</button>
            ) : (
              <Link to="/" className="px-6 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition">Cancel</Link>
            )}
            {step < 4 ? (
              <button onClick={nextStep} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl transition">Continue →</button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-black rounded-xl transition">
                {loading ? 'Posting...' : '🚀 Post Job to Escrow'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
