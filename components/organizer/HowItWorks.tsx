import { ClipboardList, Search, Calendar, ThumbsUp } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">How SOS Works for Businesses</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A simple 3-step process to find reliable staff for any industry, whether it's events, construction, retail, or more
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Step Process - Desktop */}
          <div className="hidden md:block mb-16">
            <div className="relative">
              {/* Progress Line */}
              
              
              {/* Steps */}
              <div className="flex justify-between items-start relative">
                {/* Step 1 */}
                <div className="w-1/3 px-6 text-center">
                  <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mb-6 mx-auto z-10 relative">
                    <ClipboardList size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Describe Your Needs</h3>
                  <p className="text-gray-700">Tell us what positions you need to fill, when, where, and any specific requirements or certifications.</p>
                </div>
                
                {/* Step 2 */}
                <div className="w-1/3 px-6 text-center">
                  <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mb-6 mx-auto z-10 relative">
                    <Search size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Get Matched</h3>
                  <p className="text-gray-700">Our platform instantly shows you available, vetted Shifters in your area with the right skills.</p>
                </div>
                
                {/* Step 3 */}
                <div className="w-1/3 px-6 text-center">
                  <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mb-6 mx-auto z-10 relative">
                    <ThumbsUp size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Confirm & Relax</h3>
                  <p className="text-gray-700">Select your team, confirm your booking, and we'll handle the rest—including payments.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step Process - Mobile */}
          <div className="md:hidden space-y-10">
            {/* Step 1 */}
            <div className="flex items-start">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Describe Your Needs</h3>
                <p className="text-gray-700">Tell us what positions you need to fill, when, where, and any specific requirements or certifications.</p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex items-start">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Get Matched</h3>
                <p className="text-gray-700">Our platform instantly shows you available, vetted Shifters in your area with the right skills.</p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex items-start">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Confirm & Relax</h3>
                <p className="text-gray-700">Select your team, confirm your booking, and we'll handle the rest—including payments.</p>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
      
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;