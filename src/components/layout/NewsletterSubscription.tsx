import React, { useState } from 'react';
import { EnvelopeIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
      
      // Reset subscription status after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="bg-zim-green-50 rounded-lg p-6 border border-zim-green-100">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="p-2 rounded-full bg-zim-green-100">
            <EnvelopeIcon className="h-6 w-6 text-zim-green" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-base font-medium text-gray-900">Subscribe to our newsletter</h3>
          <p className="mt-1 text-sm text-gray-600">
            Get the latest news, updates, and tips for better property management.
          </p>
          
          {subscribed ? (
            <div className="mt-4 flex items-center text-sm text-zim-green">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              <span>Thank you for subscribing! Check your inbox for confirmation.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    id="newsletter-email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full rounded-l-md border-gray-300 shadow-sm sm:text-sm ${
                      error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'focus:border-zim-green focus:ring-zim-green'
                    }`}
                    placeholder="Enter your email"
                  />
                  {error && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <XMarkIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center rounded-r-md border border-transparent bg-zim-green px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-zim-green focus:ring-offset-2 disabled:opacity-75"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
              {error && (
                <p className="mt-1 text-xs text-red-600" id="email-error">
                  {error}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                By subscribing, you agree to our privacy policy and terms of service.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription; 