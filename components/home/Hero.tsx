'use client';

import { Building2, UserCircle, Search, MapPin, Check, X, Globe } from 'lucide-react';
import { UserPathType } from '../../types';
import { useState, useEffect } from 'react';

interface HeroProps {
  userPath: UserPathType;
  setUserPath: (path: UserPathType) => void;
}

const Hero = ({ userPath, setUserPath }: HeroProps) => {
  const [location, setLocation] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  // List of Manitoba cities and towns
  const manitobaCities = [
    'winnipeg', 'brandon', 'steinbach', 'thompson', 'portage la prairie', 
    'winkler', 'selkirk', 'morden', 'dauphin', 'flin flon', 'the pas',
    'swan river', 'virden', 'neepawa', 'beausejour', 'stonewall', 'niverville',
    'altona', 'carman', 'morris', 'gimli', 'russell', 'killarney', 'minnedosa',
    'roblin', 'carberry', 'rivers', 'boissevain', 'pilot mound', 'melita', 
    'souris', 'hamiota', 'teulon', 'arborg', 'leaf rapids', 'snow lake',
    'churchill', 'gillam', 'grand rapids', 'powerview-pine falls', 'pinawa', 
    'lac du bonnet', 'emerson', 'gretna', 'dominion city', 'st. adolphe', 
    'st. claude', 'notre dame de lourdes', 'macgregor', 'grandview', 
    'ste. anne', 'st. pierre-jolys', 'rossburn', 'fisher branch', 'gladstone'
  ];

  const checkAvailability = () => {
    if (!location.trim()) return;
    
    setIsChecking(true);
    setCheckComplete(false);
    
    // Simulate a check process
    setTimeout(() => {
      // Check if the location is in Manitoba
      const locationLower = location.toLowerCase().trim();
      
      // Check if it contains Manitoba directly
      const containsManitoba = locationLower.includes('manitoba');
      
      // Check if it matches any Manitoba city/town
      const isManitobaCityOrTown = manitobaCities.some(city => 
        locationLower.includes(city) || 
        city.includes(locationLower)
      );
      
      setIsAvailable(containsManitoba || isManitobaCityOrTown);
      setCheckComplete(true);
      setIsChecking(false);
    }, 2500); // Animation runs for 2.5 seconds
  };

  // Reset the check when location changes
  useEffect(() => {
    setCheckComplete(false);
  }, [location]);

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
            
            {/* Availability checker - right side */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-100 rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-200 rounded-full opacity-50"></div>
                
                {/* Availability checker component */}
                <div className="relative z-10 bg-white rounded-xl shadow-xl p-6">
                  <div className="text-2xl font-bold text-gray-900 mb-6">
                    Is SOS Available In Your Area?
                  </div>
                  
                  {/* Location Input */}
                  <div className="relative mb-6 text-gray-700">
                    <input
                      type="text"
                      placeholder="Enter your city or region..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full py-3 px-4 pl-10 pr-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <button 
                      onClick={checkAvailability}
                      disabled={isChecking || !location.trim()}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                        isChecking || !location.trim() ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
                      } text-white p-2 rounded-lg flex items-center transition`}
                    >
                      <Search size={18} className="mr-1" />
                      <span className="font-medium">Check</span>
                    </button>
                  </div>
                  
                  {/* Animation and Results */}
                  <div className="min-h-[120px]">
                    {isChecking && (
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="relative">
                          <Globe className="animate-pulse text-red-600" size={48} />
                          <div className="absolute top-0 left-0 w-full h-full">
                            <div className="w-12 h-12 border-t-2 border-red-600 rounded-full animate-spin"></div>
                          </div>
                        </div>
                        <p className="mt-4 text-gray-700">Checking availability worldwide...</p>
                      </div>
                    )}
                    
                    {checkComplete && (
                      <div className={`p-4 rounded-lg ${isAvailable ? 'bg-green-50' : 'bg-red-50'} mt-2`}>
                        <div className="flex items-start">
                          <div className={`p-2 rounded-full ${isAvailable ? 'bg-green-100' : 'bg-red-100'} mr-3`}>
                            {isAvailable ? (
                              <Check className={`h-5 w-5 ${isAvailable ? 'text-green-600' : 'text-red-600'}`} />
                            ) : (
                              <X className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                          <div>
                            {isAvailable ? (
                              <>
                                <p className="font-medium text-gray-900">Available in your area!</p>
                                <p className="text-sm text-gray-600">SOS is available in Manitoba, Canada.</p>
                              </>
                            ) : (
                              <>
                                <p className="font-medium text-gray-900">Not yet available</p>
                                <p className="text-sm text-gray-600">SOS is currently only available in Manitoba, Canada.</p>
                                <p className="text-sm font-medium text-red-600 mt-2">Coming soon to more locations!</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {!isChecking && !checkComplete && (
                      <div className="p-4 text-center text-gray-600">
                        <MapPin className="mx-auto mb-2" size={24} />
                        <p>Currently serving Manitoba, Canada with more locations coming soon!</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Floating card - cost savings */}
                  
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
            
            {/* Call to Action Button */}
            <div className="mb-10">
              {userPath === 'organizer' ? (
                <a 
                  href="#signup" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition font-medium text-lg"
                >
                  <Building2 className="mr-2" size={20} />
                  Join Waitlist for Businesses
                </a>
              ) : (
                <a 
                  href="#signup" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition font-medium text-lg"
                >
                  <UserCircle className="mr-2" size={20} />
                  Apply Now as Shifter
                </a>
              )}
            </div>
            
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