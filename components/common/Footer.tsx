'use client';

import { UserPathType } from '../../types';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  userPath: UserPathType;
  setUserPath: (path: UserPathType) => void;
}

const Footer = ({ userPath, setUserPath }: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and company info */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <img
                src="/logo_white.png" 
                alt="SOS Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              On-demand staffing for events, construction, retail, and more. Get reliable staff when you need them most.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Company links */}
          <div className="col-span-1">
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition">How It Works</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition">Testimonials</a></li>
              <li><a href="#blog" className="text-gray-400 hover:text-white transition">Blog</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Industries */}
          <div className="col-span-1">
            <h3 className="text-white font-bold mb-4">Industries</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#events" className="text-gray-400 hover:text-white transition">Events & Hospitality</a></li>
              <li><a href="#construction" className="text-gray-400 hover:text-white transition">Construction</a></li>
              <li><a href="#retail" className="text-gray-400 hover:text-white transition">Retail</a></li>
              <li><a href="#warehouse" className="text-gray-400 hover:text-white transition">Warehouse</a></li>
              <li><a href="#office" className="text-gray-400 hover:text-white transition">Office Support</a></li>
            </ul>
          </div>

          {/* Get Started buttons */}
          <div className="col-span-1">
            <h3 className="text-white font-bold mb-4">Get Started</h3>
            <div className="space-y-3">
              <button
                onClick={() => setUserPath('organizer')}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition"
              >
                I Need Staff
              </button>
              <button
                onClick={() => setUserPath('professional')}
                className="w-full px-4 py-2 bg-white text-gray-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition"
              >
                I Want Work
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar with copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Staff On Shift. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#terms" className="text-gray-500 hover:text-white transition">Terms</a>
            <a href="#privacy" className="text-gray-500 hover:text-white transition">Privacy</a>
            <a href="#cookies" className="text-gray-500 hover:text-white transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;