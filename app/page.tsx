'use client'; // Mark it as a client component

import { useState } from 'react';
import { ArrowRight, Check, Clock, Users, Shield, MapPin, PanelLeftOpen, Menu, X } from 'lucide-react';
type UserPathType = 'organizer' | 'professional' | null;

export default function Home() {
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userPath, setUserPath] = useState<UserPathType>(null);
  const [professionalName, setProfessionalName] = useState('');
  const [professionalEmail, setProfessionalEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [skill, setSkill] = useState('');
  const [experience, setExperience] = useState('');
  const [aboutExperience, setAboutExperience] = useState('');
  const [agreeToCheck, setAgreeToCheck] = useState(false);
  
  // Form submission status tracking
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Determine which form is being submitted based on userPath
      const formData = userPath === 'organizer' 
        ? { 
            type: 'organizer',
            email, 
            eventType 
          } 
        : {
            type: 'professional',
            name: professionalName,
            email: professionalEmail,
            phone,
            city,
            skill,
            experience,
            aboutExperience,
            agreeToCheck
          };
      
      // Send the data to our API route
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }
      
      // Success! Show confirmation 
      setSubmitted(true);
      
      // Reset all form fields
      setEmail('');
      setEventType('');
      setProfessionalName('');
      setProfessionalEmail('');
      setPhone('');
      setCity('');
      setSkill('');
      setExperience('');
      setAboutExperience('');
      setAgreeToCheck(false);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header Section */}
      <header className="bg-black text-white py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/logo_white.png"
                alt="SOS Logo"
                className="h-8 w-auto mr-2"
              />
            
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-6">
              <a href="#how-it-works" className="hover:text-red-400 transition text-sm">How It Works</a>
              <a href="#benefits" className="hover:text-red-400 transition text-sm">Benefits</a>
              <a href="#verification" className="hover:text-red-400 transition text-sm">Verification</a>
              <a href="#testimonials" className="hover:text-red-400 transition text-sm">Testimonials</a>
            </nav>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden pt-4 pb-2">
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="block hover:text-red-400" onClick={() => setMobileMenuOpen(false)}>How It Works</a></li>
                <li><a href="#benefits" className="block hover:text-red-400" onClick={() => setMobileMenuOpen(false)}>Benefits</a></li>
                <li><a href="#verification" className="block hover:text-red-400" onClick={() => setMobileMenuOpen(false)}>Verification</a></li>
                <li><a href="#testimonials" className="block hover:text-red-400" onClick={() => setMobileMenuOpen(false)}>Testimonials</a></li>
              </ul>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Event Staffing Emergencies? <br />
              <span className="text-red-500">SOS to the Rescue!</span>
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              On-demand staff and vendors for your events - when you need them most.
              No more juggling spreadsheets or making desperate calls.
            </p>

            {userPath === null && (
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div
                  className="bg-white text-black p-8 rounded-lg shadow-lg border-t-4 border-red-600 hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                  onClick={() => setUserPath('organizer')}
                >
                  <h3 className="text-2xl font-bold mb-4">I&apos;m an Event Organizer</h3>
                  <p className="mb-4">Need reliable staff and vendors for my events</p>
                  <div className="flex justify-center">
                    <ArrowRight className="text-red-600" size={24} />
                  </div>
                </div>

                <div
                  className="bg-white text-black p-8 rounded-lg shadow-lg border-t-4 border-red-600 hover:transform hover:scale-105 transition duration-300 cursor-pointer"
                  onClick={() => setUserPath('professional')}
                >
                  <h3 className="text-2xl font-bold mb-4">I&apos;m an Event Professional</h3>
                  <p className="mb-4">Want to offer my services and find work</p>
                  <div className="flex justify-center">
                    <ArrowRight className="text-red-600" size={24} />
                  </div>
                </div>
              </div>
            )}

            {userPath && (
              <button
                onClick={() => setUserPath(null)}
                className="mt-8 text-sm text-gray-300 hover:text-white flex items-center mx-auto"
              >
                <span>Change selection</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Conditional Content Based on User Path */}
      {userPath === 'organizer' && (
        <>
          {/* Common SOS Scenarios */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-black">Common SOS Scenarios</h2>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="mt-1 mr-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">&quot;Half my staff just canceled for tomorrow&apos;s event!&quot;</h3>
                        <p className="text-gray-700">With SOS, you can find vetted, qualified replacements within hours.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">&quot;I need 300 people for the Winnipeg Folk Festival in three days.&quot;</h3>
                        <p className="text-gray-700">SOS can scale to help you staff large events on short notice.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">&quot;I&apos;m scrambling to find bartenders, servers, and security for a wedding.&quot;</h3>
                        <p className="text-gray-700">From bartenders to security - find all your staffing needs in one place.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works for Organizers */}
          <section id="how-it-works" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-black">How SOS Works for Event Organizers</h2>

              <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mb-4 font-bold text-xl">1</div>
                  <h3 className="text-xl font-bold mb-2 text-black">Describe Your Event</h3>
                  <p className="text-gray-700">Tell us what you need - staff, vendors, equipment - and when you need it.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mb-4 font-bold text-xl">2</div>
                  <h3 className="text-xl font-bold mb-2 text-black">Get Matched</h3>
                  <p className="text-gray-700">Our platform instantly shows you available, vetted professionals in your area.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mb-4 font-bold text-xl">3</div>
                  <h3 className="text-xl font-bold mb-2 text-black">Book & Relax</h3>
                  <p className="text-gray-700">Confirm your selections and rest easy knowing your event is covered.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits for Organizers */}
          <section id="benefits" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-black">Why Event Organizers Choose SOS</h2>

              <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <Clock className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">Last-Minute Solutions</h3>
                    <p className="text-gray-700">Emergency staffing when you need it most - even with just hours to spare.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <Shield className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">Vetted Professionals</h3>
                    <p className="text-gray-700">Every staff member and vendor is pre-screened and qualified.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <PanelLeftOpen className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">All-in-One Platform</h3>
                    <p className="text-gray-700">Staff, bartenders, security, equipment - everything you need in one place.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <MapPin className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-black">Location Flexible</h3>
                    <p className="text-gray-700">From weddings in Banff to expos in Toronto - we&apos;ve got Canada covered.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Verification */}
          <section id="verification" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-6 text-black">Rigorous Vetting & Verification</h2>
              <p className="text-lg text-center mb-12 text-gray-700 max-w-3xl mx-auto">
                We maintain the highest standards for our staff and vendors, ensuring your events are in capable hands.
              </p>

              <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-red-600" size={32} />
                  </div>
                  <h3 className="font-bold mb-2 text-black">Background Checks</h3>
                  <p className="text-gray-700">Comprehensive criminal and reference checks for all staff members.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-red-600" size={32} />
                  </div>
                  <h3 className="font-bold mb-2 text-black">Skill Verification</h3>
                  <p className="text-gray-700">Skills assessment and certification validation for specialized positions.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-red-600" size={32} />
                  </div>
                  <h3 className="font-bold mb-2 text-black">Quality Ratings</h3>
                  <p className="text-gray-700">Ongoing performance reviews from event organizers after each job.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-red-600" size={32} />
                  </div>
                  <h3 className="font-bold mb-2 text-black">Reliability Tracking</h3>
                  <p className="text-gray-700">Attendance and punctuality monitoring to ensure dependable staff.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Organizer Sign Up */}
          <section id="signup" className="py-16 bg-black text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Be Among the First Event Organizers to Use SOS</h2>
                <p className="text-lg mb-8">
                  We&apos;re launching soon! Join our waitlist to get early access and special founder benefits.
                </p>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl text-left">
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="eventType" className="block text-gray-700 font-bold mb-2">What type of events do you organize? (Optional)</label>
                      <select
                        id="eventType"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                      >
                        <option value="">Select an option</option>
                        <option value="corporate">Corporate Events</option>
                        <option value="wedding">Weddings</option>
                        <option value="festival">Festivals</option>
                        <option value="concert">Concerts</option>
                        <option value="sports">Sports Events</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg"
                    >
                      Join the Waitlist
                    </button>
                  </form>
                ) : (
                  <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="text-red-600" size={32} />
                    </div>
                    <h3 className="text-gray-800 text-xl font-bold mb-2">You&apos;re on the list!</h3>
                    <p className="text-gray-600 mb-4">
                      Thanks for your interest in SOS. We&apos;ll be in touch soon with exclusive early access details.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Sign up another email
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {userPath === 'professional' && (
        <>
          {/* For Staff Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-black">Join the SOS Professional Network</h2>

                <div className="bg-gray-50 p-8 rounded-lg shadow-md mb-12">
                  <h3 className="text-xl font-bold mb-4 text-black">Why Work With SOS?</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white mr-3">
                          <Check size={16} />
                        </div>
                        <h4 className="font-bold">Flexible Schedule</h4>
                      </div>
                      <p className="text-gray-700 pl-11">Work when you want, for events that fit your availability.</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white mr-3">
                          <Check size={16} />
                        </div>
                        <h4 className="font-bold">Competitive Pay</h4>
                      </div>
                      <p className="text-gray-700 pl-11">Earn premium rates, especially for emergency staffing needs.</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white mr-3">
                          <Check size={16} />
                        </div>
                        <h4 className="font-bold">Same-Day Payment</h4>
                      </div>
                      <p className="text-gray-700 pl-11">Get paid quickly after completing your assignments.</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white mr-3">
                          <Check size={16} />
                        </div>
                        <h4 className="font-bold">Build Your Reputation</h4>
                      </div>
                      <p className="text-gray-700 pl-11">Earn ratings and reviews to increase your visibility and booking potential.</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-6 text-center text-black">We&apos;re Looking For:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <span className="font-bold text-gray-800">Bartenders</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <span className="font-bold text-gray-800">Servers</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <span className="font-bold text-gray-800">Security Staff</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <span className="font-bold text-gray-800">Event Coordinators</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <span className="font-bold text-gray-800">Technical Support</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <span className="font-bold text-gray-800">Vendor Services</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How it Works for Staff */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-black">How SOS Works for Professionals</h2>

              <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mb-4 font-bold text-xl">1</div>
                  <h3 className="text-xl font-bold mb-2 text-black">Create Your Profile</h3>
                  <p className="text-gray-700">Share your skills, experience, and availability to stand out to event organizers.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mb-4 font-bold text-xl">2</div>
                  <h3 className="text-xl font-bold mb-2 text-black">Get Booking Requests</h3>
                  <p className="text-gray-700">Receive notifications when your skills match an event&apos;s needs in your area.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mb-4 font-bold text-xl">3</div>
                  <h3 className="text-xl font-bold mb-2 text-black">Work & Get Paid</h3>
                  <p className="text-gray-700">Complete the assignment and receive payment quickly and securely.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Verification for Staff */}
          <section id="verification" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-6 text-black">Our Verification Process</h2>
              <p className="text-lg text-center mb-12 text-gray-700 max-w-3xl mx-auto">
                We maintain high standards to ensure quality opportunities for our professionals. Here&apos;s what to expect:
              </p>

              <div className="max-w-4xl mx-auto">
                <div className="border-l-4 border-red-500 pl-6 mb-8">
                  <h3 className="text-xl font-bold mb-2 text-black">Background Verification</h3>
                  <p className="text-gray-700 mb-2">We conduct thorough background checks to maintain platform integrity.</p>
                </div>

                <div className="border-l-4 border-red-500 pl-6 mb-8">
                  <h3 className="text-xl font-bold mb-2 text-black">Skills Assessment</h3>
                  <p className="text-gray-700 mb-2">Your certifications and skills will be verified to match you with appropriate events.</p>
                </div>

                <div className="border-l-4 border-red-500 pl-6 mb-8">
                  <h3 className="text-xl font-bold mb-2 text-black">Performance Reviews</h3>
                  <p className="text-gray-700 mb-2">After each event, you&apos;ll receive ratings and feedback to build your reputation.</p>
                </div>

                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-xl font-bold mb-2 text-black">Ongoing Reliability Tracking</h3>
                  <p className="text-gray-700 mb-2">Consistent performance leads to more opportunities and higher-paying gigs.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Staff Sign Up */}
          <section id="signup" className="py-16 bg-black text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6">Ready to Join the SOS Network?</h2>
                <p className="text-lg text-center mb-8">
                  Apply now to be among the first professionals on our platform when we launch.
                </p>

                {!submitted ? (
                  <div className="bg-white p-6 rounded-lg shadow-xl text-left text-black">
                  <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Full Name *</label>
                        <input 
                          type="text" 
                          value={professionalName}
                          onChange={(e) => setProfessionalName(e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Email *</label>
                        <input
                          type="email"
                          value={professionalEmail}
                          onChange={(e) => setProfessionalEmail(e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Phone *</label>
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">City *</label>
                        <input 
                          type="text" 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Primary Skill *</label>
                        <select 
                          value={skill}
                          onChange={(e) => setSkill(e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
                          required
                        >
                          <option value="">Select your primary skill</option>
                          <option value="bartender">Bartender</option>
                          <option value="server">Server</option>
                          <option value="security">Security</option>
                          <option value="coordinator">Event Coordinator</option>
                          <option value="technical">Technical Support</option>
                          <option value="vendor">Vendor/Equipment Provider</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Years of Experience *</label>
                        <select 
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
                          required
                        >
                          <option value="">Select years</option>
                          <option value="0-1">0-1 years</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5+">5+ years</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 font-bold mb-2">Tell us about your experience (Optional)</label>
                      <textarea 
                        rows={3}
                        value={aboutExperience}
                        onChange={(e) => setAboutExperience(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
                        placeholder="Share your relevant skills and experience..."
                      ></textarea>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          id="background-check" 
                          checked={agreeToCheck}
                          onChange={(e) => setAgreeToCheck(e.target.checked)}
                          className="mt-1 mr-2" 
                          required 
                        />
                        <label htmlFor="background-check" className="text-gray-700">
                          I understand SOS requires background checks and skills verification for all professionals *
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full ${isSubmitting ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'} text-white font-bold py-3 px-6 rounded-lg transition shadow-lg`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Apply to Join'}
                    </button>
                    
                    {submitError && (
                      <p className="mt-3 text-red-600 text-center">{submitError}</p>
                    )}
                  </form>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-red-600" size={32} />
                  </div>
                  <h3 className="text-gray-800 text-xl font-bold mb-2">Application Received!</h3>
                  <p className="text-gray-600 mb-4">
                    Thanks for your interest in joining the SOS professional network. We&apos;ll review your application and be in touch soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Submit another application
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    )}

    {/* Testimonials - Visible to all */}
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">Success Stories</h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-red-700 font-bold">JM</span>
              </div>
              <div>
                <h4 className="font-bold">Jordan M.</h4>
                <p className="text-sm text-gray-600">Festival Coordinator</p>
              </div>
            </div>
            <p className="text-gray-700">&quot;When 30 security staff canceled the day before our festival, SOS saved us. Within hours, we had qualified replacements ready to work.&quot;</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-red-700 font-bold">SL</span>
              </div>
              <div>
                <h4 className="font-bold">Sarah L.</h4>
                <p className="text-sm text-gray-600">Wedding Planner</p>
              </div>
            </div>
            <p className="text-gray-700">&quot;I used to spend days finding reliable bartenders and servers. Now with SOS, I can book vetted staff in minutes. A game-changer!&quot;</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-red-700 font-bold">KT</span>
              </div>
              <div>
                <h4 className="font-bold">Kevin T.</h4> 
                <p className="text-sm text-gray-600">Bartender</p>
              </div>
            </div>
            <p className="text-gray-700">&quot;SOS has connected me with quality gigs that fit my schedule. The verification process was thorough but worth it for the premium opportunities.&quot;</p>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold flex items-center">
              SOS <span className="ml-2 text-sm">Staff On Shift</span>
            </h2>
            <p className="mt-2 text-gray-400">Event staffing emergencies solved.</p>
          </div>

          {userPath === null && (
            <div className="flex space-x-6">
              <button
                onClick={() => setUserPath('organizer')}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-bold"
              >
                For Event Organizers
              </button>
              <button
                onClick={() => setUserPath('professional')}
                className="px-4 py-2 bg-white text-black hover:bg-gray-100 rounded text-sm font-bold"
              >
                For Event Professionals
              </button>
            </div>
          )}

          <div className="text-sm text-gray-400 text-center mt-6 md:mt-0">
            &copy; {new Date().getFullYear()} SOS Staff On Shift. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
);
}