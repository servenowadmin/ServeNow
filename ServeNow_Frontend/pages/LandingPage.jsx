import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const services = [
    { icon: '🧹', name: 'Cleaning', desc: 'Home & office cleaning' },
    { icon: '🚛', name: 'Junk Removal', desc: 'Fast haul away service' },
    { icon: '🔧', name: 'Handyman', desc: 'Repairs & installations' },
    { icon: '🌿', name: 'Yard Care', desc: 'Lawn & garden work' },
    { icon: '📦', name: 'Moving', desc: 'Local moving help' },
    { icon: '✨', name: 'Custom Task', desc: 'Anything you need' },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Post Your Job',
      desc: 'Describe what you need, set your budget, and choose your location. Takes less than 2 minutes.',
      icon: '📋',
    },
    {
      step: '02',
      title: 'Get Bids',
      desc: 'Verified local providers see your job and send competitive bids. You choose the best fit.',
      icon: '💬',
    },
    {
      step: '03',
      title: 'Pay Securely',
      desc: 'Your payment is held in escrow. Released only when the job is done and you approve.',
      icon: '🔒',
    },
    {
      step: '04',
      title: 'Rate & Review',
      desc: 'Leave a review to help the community. Great providers rise to the top.',
      icon: '⭐',
    },
  ];

  const trustFeatures = [
    {
      icon: '🛡️',
      title: 'Verified Providers',
      desc: 'Every provider submits a government ID and live selfie. We verify they match before activation.',
    },
    {
      icon: '💰',
      title: 'Secure Escrow',
      desc: 'Your money is protected until the job is complete and you approve the work.',
    },
    {
      icon: '📸',
      title: 'Photo Proof System',
      desc: 'Providers document arrival, existing damage, and completion with timestamped photos.',
    },
    {
      icon: '⚡',
      title: 'One-Strike Policy',
      desc: 'No-shows and scammers are permanently suspended. No second chances.',
    },
    {
      icon: '🏆',
      title: 'Nationwide Network',
      desc: 'Find trusted providers in your zip code across all 50 states.',
    },
    {
      icon: '📞',
      title: 'Dispute Resolution',
      desc: 'Our admin team personally mediates any conflict and makes fair decisions.',
    },
  ];

  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      color: 'border-gray-200',
      badge: '',
      features: [
        'Browse all jobs',
        'Submit up to 3 bids/month',
        'Standard payment release',
        'Basic profile listing',
        'Community support',
      ],
    },
    {
      name: 'Pro',
      price: '$19',
      color: 'border-emerald-500',
      badge: 'Most Popular',
      features: [
        'Unlimited job bids',
        'Featured profile badge',
        'Instant payment release',
        'Priority in search results',
        'Direct customer messaging',
        'Monthly analytics report',
      ],
    },
    {
      name: 'Elite',
      price: '$49',
      color: 'border-yellow-400',
      badge: 'Gold Shield',
      features: [
        'Everything in Pro',
        'Gold Shield verification badge',
        'Top placement guaranteed',
        'Rush job notifications first',
        'Dedicated support line',
        'Profile video showcase',
        'Referral bonus program',
      ],
    },
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl">S</span>
            </div>
            <span className="text-xl font-black text-gray-900">Serve Now</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="text-gray-600 hover:text-emerald-600 font-medium transition">Find Work</Link>
            <Link to="/post-job" className="text-gray-600 hover:text-emerald-600 font-medium transition">Post a Job</Link>
            <a href="#how-it-works" className="text-gray-600 hover:text-emerald-600 font-medium transition">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-emerald-600 font-medium transition">Pricing</a>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login" className="text-gray-700 font-semibold hover:text-emerald-600 transition px-4 py-2">Sign In</Link>
            <Link to="/signup" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-lg transition">Get Started</Link>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="text-2xl">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4">
            <Link to="/marketplace" className="block text-gray-700 font-medium py-2">Find Work</Link>
            <Link to="/post-job" className="block text-gray-700 font-medium py-2">Post a Job</Link>
            <Link to="/login" className="block text-gray-700 font-medium py-2">Sign In</Link>
            <Link to="/signup" className="block bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg text-center">Get Started Free</Link>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-emerald-500 bg-opacity-40 text-emerald-100 text-sm font-bold px-4 py-2 rounded-full mb-6 border border-emerald-400">
            🇺🇸 Trusted Across All 50 States
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Trusted Services.<br />
            <span className="text-emerald-200">Delivered Nationwide.</span>
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect with verified local professionals. Secure escrow payments. One-strike accountability. No scams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/post-job" className="bg-white text-emerald-700 font-black text-lg px-10 py-4 rounded-xl hover:bg-emerald-50 transition shadow-lg">
              Post a Job Now
            </Link>
            <Link to="/signup" className="border-2 border-white text-white font-bold text-lg px-10 py-4 rounded-xl hover:bg-white hover:text-emerald-700 transition">
              Become a Provider
            </Link>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-8 text-emerald-100">
            <div className="text-center">
              <div className="text-3xl font-black text-white">10K+</div>
              <div className="text-sm">Verified Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white">50K+</div>
              <div className="text-sm">Jobs Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white">4.9★</div>
              <div className="text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white">$0</div>
              <div className="text-sm">To Post a Job</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-500 text-lg">From everyday tasks to specialized projects</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service) => (
              <Link to="/marketplace" key={service.name}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg hover:border-emerald-300 border border-gray-100 transition cursor-pointer group">
                <div className="text-4xl mb-3">{service.icon}</div>
                <div className="font-bold text-gray-900 group-hover:text-emerald-600 transition">{service.name}</div>
                <div className="text-xs text-gray-400 mt-1">{service.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-500 text-lg">Get any job done in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={item.step} className="text-center relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-3/4 w-full h-0.5 bg-emerald-100 z-0" />
                )}
                <div className="relative z-10 w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg">
                  {item.icon}
                </div>
                <div className="text-xs font-black text-emerald-500 mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-black text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST FEATURES */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Why Choose Serve Now?</h2>
            <p className="text-gray-500 text-lg">Built from the ground up for safety, trust, and accountability</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustFeatures.map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-black text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF SYSTEM HIGHLIGHT */}
      <section className="py-20 px-6 bg-emerald-700 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">The Serve Now Protection System</h2>
            <p className="text-emerald-200 text-lg">Every job is documented from start to finish</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-600 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-xl font-black mb-2">Arrival Check-In</h3>
              <p className="text-emerald-200 text-sm">Provider takes a timestamped GPS photo when they arrive. Proves they showed up on time.</p>
            </div>
            <div className="bg-emerald-600 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-black mb-2">Before & After Proof</h3>
              <p className="text-emerald-200 text-sm">Existing damage documented before work begins. Completion photos required before payment releases.</p>
            </div>
            <div className="bg-emerald-600 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-black mb-2">Customer Approval</h3>
              <p className="text-emerald-200 text-sm">You approve the work before funds release. 24-hour window. Once approved, the decision is final.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Provider Plans</h2>
            <p className="text-gray-500 text-lg">Start free. Upgrade when you're ready to grow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.name} className={`rounded-2xl border-2 ${plan.color} p-8 relative hover:shadow-xl transition ${plan.name === 'Pro' ? 'shadow-lg scale-105' : ''}`}>
                {plan.badge && (
                  <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black text-white ${plan.name === 'Elite' ? 'bg-yellow-500' : 'bg-emerald-600'}`}>
                    {plan.badge}
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-black text-emerald-600">
                    {plan.price}
                    {plan.price !== 'Free' && <span className="text-lg text-gray-400 font-normal">/mo</span>}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className={`block text-center font-bold py-3 rounded-xl transition ${plan.name === 'Pro' ? 'bg-emerald-600 text-white hover:bg-emerald-700' : plan.name === 'Elite' ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'border-2 border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-600'}`}>
                  {plan.price === 'Free' ? 'Get Started Free' : `Start ${plan.name}`}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 text-xl mb-10">
            Join thousands of customers and providers building trust one job at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/post-job" className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg px-10 py-4 rounded-xl transition">
              Post a Job — It's Free
            </Link>
            <Link to="/signup" className="border-2 border-gray-600 text-white font-bold text-lg px-10 py-4 rounded-xl hover:border-emerald-500 hover:text-emerald-400 transition">
              Become a Provider
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-400 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-xl">S</span>
                </div>
                <span className="text-white font-black text-lg">Serve Now</span>
              </div>
              <p className="text-sm leading-relaxed">Trusted services, delivered nationwide. Your neighborhood heroes are here.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">For Customers</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/post-job" className="hover:text-emerald-400 transition">Post a Job</Link></li>
                <li><Link to="/marketplace" className="hover:text-emerald-400 transition">Browse Providers</Link></li>
                <li><a href="#how-it-works" className="hover:text-emerald-400 transition">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">For Providers</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/signup" className="hover:text-emerald-400 transition">Become a Provider</Link></li>
                <li><Link to="/login" className="hover:text-emerald-400 transition">Provider Login</Link></li>
                <li><a href="#pricing" className="hover:text-emerald-400 transition">Pricing & Plans</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Support</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 Serve Now. All rights reserved. Building trust, one service at a time.</p>
            <p className="mt-2 text-xs text-gray-600">Serve Now is a neutral third-party platform. Providers are independent contractors, not employees of Serve Now.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
