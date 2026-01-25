'use client';

import React, { useState } from 'react';
import { Mail, User, Lock } from 'lucide-react';
import { API_URL } from '@/config';

const TrialSignup = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleStartTrial = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !fullName || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
          name: fullName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed. Please try again.');
      }

      const data = await response.json();
      console.log(data);
      // Success
      if (data?.code === 200 || data?.status === 'success') {
        alert('Trial started successfully!');



        // Reset form
        setEmail('');
        setFullName('');
        setPassword('');
      } else {
        alert(data?.message ?? "Unknown error occurred")
      }
      // You can redirect or handle success here
      // window.location.href = '/dashboard';

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4F5BD5] via-[#3D47B8] to-[#2B35A0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 lg:p-12 space-y-10 border border-white/20 shadow-xl">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-[#4F5BD5] font-bold text-xl">S</span>
            </div>

            <h1 className="text-white text-3xl lg:text-4xl font-semibold">
              Try SKILLER
            </h1>

            <p className="text-white text-5xl font-bold">
              60 days free
            </p>

            <p className="text-white/90 text-base">
              Then $0.00 per month starting February 27, 2026.
            </p>

            <p className="text-white/70 text-sm leading-relaxed">
              No credit card required. Cancel anytime after your trial.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleStartTrial} className="space-y-6">
            <div className="space-y-4">
              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (min. 8 characters)"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-300 text-sm text-center">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl text-white font-semibold text-lg transition-all ${isSubmitting
                ? 'bg-pink-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 active:scale-[0.98]'
                }`}
            >
              {isSubmitting ? 'Processing…' : 'Start free trial'}
            </button>

            {/* Footer */}
            <div className="text-center text-white/70 text-sm space-x-2">
              <span>Powered by Stripe</span>
              <span>•</span>
              <a href="#" className="hover:text-white">Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-white">Privacy</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrialSignup;
