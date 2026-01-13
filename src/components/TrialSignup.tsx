'use client'
import React, { useState } from 'react';
import { API_URL } from '@/config';

const TrialSignup = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartTrial = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !fullName) {
      alert('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    // TODO: Add API integration here
    console.log('Starting trial for:', { email, fullName });
    
    // Simulate API call
    setTimeout(() => {
      alert('Trial started successfully! (API integration pending)');
      setIsSubmitting(false);
      // You can add redirect logic here
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4F5BD5] via-[#3D47B8] to-[#2B35A0] flex flex-col">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-[#4F5BD5] font-bold text-lg">S</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white text-sm">
          <span className="hidden sm:inline">3:28</span>
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded"></div>
            <div className="w-1 h-3 bg-white rounded"></div>
            <div className="w-1 h-3 bg-white rounded"></div>
            <div className="w-1 h-3 bg-white rounded opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 lg:p-8 space-y-6">
            {/* Trial Info */}
            <div className="text-center space-y-3">
              <h1 className="text-white text-2xl lg:text-3xl font-semibold">
                Try SKILLER
              </h1>
              <div className="space-y-2">
                <p className="text-white text-4xl lg:text-5xl font-bold">
                  60 days free
                </p>
                <p className="text-white/90 text-sm lg:text-base">
                  Then $0.00 per month starting February 27, 2026.
                </p>
                <p className="text-white/80 text-xs lg:text-sm leading-relaxed">
                  Your free access lasts 60 days. After that, you'll have the option to upgrade to continue your training.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleStartTrial} className="space-y-4">
              <div className="space-y-3">
                <label className="block text-white/90 text-sm font-medium">
                  Contact details
                </label>
                
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ✉️
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/95 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    👤
                  </span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/95 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>
              </div>

              {/* Start Trial Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
                  isSubmitting 
                    ? 'bg-pink-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Start trial'}
              </button>

              {/* Footer Links */}
              <div className="flex items-center justify-center gap-3 text-white/80 text-xs">
                <span>Powered by Stripe</span>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
              </div>
            </form>
          </div>

          {/* Desktop Additional Info */}
          <div className="hidden lg:block mt-6 text-center">
            <p className="text-white/70 text-sm">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Large Screen Layout */}
      <style jsx>{`
        @media (min-width: 1024px) {
          .min-h-screen {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default TrialSignup;
