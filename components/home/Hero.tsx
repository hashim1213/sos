'use client';

import { ArrowRight, Building2, UserCircle, Search, User, Calendar } from 'lucide-react';
import { UserPathType } from '../../types';
import { useState } from 'react';

interface HeroProps {
  userPath: UserPathType;
  setUserPath: (path: UserPathType) => void;
}

const Hero = ({ userPath, setUserPath }: HeroProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'professionals' | 'organizers'>('professionals');

  return (
    <section className="bg-white py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {userPath === null ? (
          <div className="flex flex-col lg:flex-row items-center">
            {/* Text content - left side */}
            <div className="w-full lg:w-1/2 pr-0 lg:pr-12 mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                On-demand staff for <span className="text-red-600">any business</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-xl">
                From events and construction to retail and warehousing. Get reliable staff when you need them most.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <button 
                  onClick={() => setUserPath('organizer')}
                  className="flex items-center justify-center px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition font-medium text-lg"
                >
                  <Building2 className="mr-2" size={20} />
                  I Need Staff
                </button>
                
                <button 
                  onClick={() => setUserPath('professional')}
                  className="flex items-center justify-center px-6 py-4 bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-lg shadow-sm transition font-medium text-lg"
                >
                  <UserCircle className="mr-2" size={20} />
                  I Want Work
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <img src="/avatar-1.png" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="/avatar-2.png" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="/avatar-3.png" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">5,000+</span> workers ready to join your team
                </p>
              </div>
            </div>
            
            {/* Search component - right side */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-100 rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-200 rounded-full opacity-50"></div>
                
                {/* Search component */}
                <div className="relative z-10 bg-white rounded-xl shadow-xl p-6">
                  <div className="text-2xl font-bold text-gray-900 mb-6">
                    Find Your Perfect Shifter
                  </div>
                  
                  {/* Tab Navigation */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button 
                      className={`flex items-center justify-center p-3 rounded-lg ${
                        activeTab === 'professionals' 
                          ? 'bg-white border border-gray-200 shadow-sm' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      } transition`}
                      onClick={() => setActiveTab('professionals')}
                    >
                      <User className="mr-2 text-gray-700" size={20} />
                      <span className="font-medium text-gray-700">Shifters</span>
                    </button>
                    <button 
                      className={`flex items-center justify-center p-3 rounded-lg ${
                        activeTab === 'organizers' 
                          ? 'bg-white border border-gray-200 shadow-sm' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      } transition`}
                      onClick={() => setActiveTab('organizers')}
                    >
                      <Calendar className="mr-2 text-gray-700" size={20} />
                      <span className="font-medium text-gray-700">Organizers</span>
                    </button>
                  </div>
                  
                  {/* Search Input */}
                  <div className="relative mb-6">
                    <input
                      type="text"
                      placeholder={activeTab === 'professionals' 
                        ? "Search for bartenders, servers, security staff..." 
                        : "Search for venues, events, staff needs..."}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full py-3 px-4 pr-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg flex items-center transition">
                      <Search size={18} className="mr-1" />
                      <span className="font-medium">Search</span>
                    </button>
                  </div>
                  
                  {/* Popular Searches */}
                  <div className="flex flex-wrap items-center">
                    <span className="text-gray-600 mr-3">Popular:</span>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm transition">
                        Bartender
                      </button>
                      <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm transition">
                        Server
                      </button>
                      <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm transition">
                        Security
                      </button>
                      <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm transition">
                        AV Technician
                      </button>
                    </div>
                  </div>
                  
                  {/* Floating card - cost savings */}
                  <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 002 2h6a2 2 0 002-2v-1a2 2 0 00-2-2V6a1 1 0 10-2 0v1H8V6zm10 8a1 1 0 01-1 1H3a1 1 0 110-2h14a1 1 0 011 1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">26% cost savings</p>
                        <p className="text-sm text-gray-600">vs traditional agencies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
              {userPath === 'organizer' ? (
                <>Find reliable <span className="text-red-600">staff</span> instantly</>
              ) : (
                <>Join our <span className="text-red-600">shifter</span> network</>
              )}
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light text-gray-600">
              {userPath === 'organizer' 
                ? 'Get vetted workers for your business needs, when you need them most.' 
                : 'Find flexible work that fits your schedule across multiple industries.'}
            </p>
            
            <button
              onClick={() => setUserPath(null)}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center mx-auto"
            >
              <span>Change selection</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;