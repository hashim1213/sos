'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white text-gray-900 py-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo area */}
          <div className="flex items-center">
            <img
              src="/logo_red.png" 
              alt="SOS Logo"
              className="h-8 w-auto mr-2"
            />
            
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="hover:text-red-600 transition text-sm font-medium">How It Works</a>
            <a href="#for-business" className="hover:text-red-600 transition text-sm font-medium">For Business</a>
            <a href="#for-staff" className="hover:text-red-600 transition text-sm font-medium">For Staff</a>
            <a href="#testimonials" className="hover:text-red-600 transition text-sm font-medium">Testimonials</a>
            
            {/* Sign in button */}
            <a 
              href="/login" 
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Sign in
            </a>
            
            {/* CTA Button */}
            <a
              href="https://sos-2-eb03.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition shadow-sm"
            >
              Get Started
            </a>
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2">
            <ul className="space-y-3">
              <li><a href="#how-it-works" className="block hover:text-red-600 py-1" onClick={() => setMobileMenuOpen(false)}>How It Works</a></li>
              <li><a href="#for-business" className="block hover:text-red-600 py-1" onClick={() => setMobileMenuOpen(false)}>For Business</a></li>
              <li><a href="#for-staff" className="block hover:text-red-600 py-1" onClick={() => setMobileMenuOpen(false)}>For Staff</a></li>
              <li><a href="#testimonials" className="block hover:text-red-600 py-1" onClick={() => setMobileMenuOpen(false)}>Testimonials</a></li>
              <li><a href="/login" className="block hover:text-red-600 py-1">Sign in</a></li>
              <li>
                <a
                  href="https://sos-2-eb03.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-center"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;