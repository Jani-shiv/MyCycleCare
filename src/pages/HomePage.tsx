import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Heart, Shield, MessageCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

/**
 * HomePage Component
 * Main landing page of the MyCycleCare application
 * Displays hero section, features, CTA, and footer
 * Handles conditional rendering based on authentication status
 */
const HomePage = () => {
  // Get authentication status from UserContext
  const { isAuthenticated } = useUser();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Main landing area with title and call-to-action buttons */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              MyCycleCare
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Your personal AI-powered period and wellness companion
            </p>
            {/* Conditional rendering of authentication buttons based on user status */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-md font-semibold shadow-lg transition-all hover:shadow-xl"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-md font-semibold shadow-lg transition-all hover:shadow-xl"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-md font-semibold transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Wave Divider - Decorative wave SVG separator */}
        <div className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,128L48,112C96,96,192,64,288,64C384,64,480,96,576,112C672,128,768,128,864,112C960,96,1056,64,1152,48C1248,32,1344,32,1392,32L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </header>
      
      {/* Features Section - Displays key features with icons and descriptions */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Understand Your Cycle Like Never Before
          </h2>
          
          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Smart Tracking Feature */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-100 dark:bg-purple-700 text-purple-600 dark:text-purple-200">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Smart Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Accurately predict your period, ovulation, and fertility windows with AI-powered insights.
              </p>
            </div>
            
            {/* Mood & Wellness Feature */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-100 dark:bg-purple-700 text-purple-600 dark:text-purple-200">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Mood & Wellness</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track your mood, symptoms, and emotional well-being to identify patterns and improve self-care.
              </p>
            </div>
            
            {/* Privacy & Security Feature */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-100 dark:bg-purple-700 text-purple-600 dark:text-purple-200">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Private & Secure</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data stays private with end-to-end encryption and zero third-party tracking.
              </p>
            </div>
            
            {/* AI Assistant Feature */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-100 dark:bg-purple-700 text-purple-600 dark:text-purple-200">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">AI Assistant</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get personalized advice, wellness tips, and answers to your questions from our AI wellness buddy.
              </p>
            </div>
          </div>        
        </div>
      </section>
      
      {/* CTA Section - Call to action for user registration or dashboard access */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Take Control of Your Cycle Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Join thousands of others who are using MyCycleCare to understand their bodies better.
          </p>
          <Link
            to={isAuthenticated ? "/dashboard" : "/register"}
            className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            {isAuthenticated ? "Go to Dashboard" : "Start Your Free Trial"}
          </Link>
        </div>
      </section>
      
      {/* Footer Section - Contains copyright, links and company information */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Company Logo and Tagline */}
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">MyCycleCare</h2>
              <p className="text-gray-400 text-sm">Your personal wellness companion</p>
            </div>
            
            {/* Footer Navigation Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          {/* Copyright Notice */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MyCycleCare. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;