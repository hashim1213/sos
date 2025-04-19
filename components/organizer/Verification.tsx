import { Shield, Award, BadgeCheck, Star } from 'lucide-react';

const Verification = () => {
  return (
    <section id="verification" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Trust & Verification</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We maintain the highest standards for our workers across all industries, ensuring your business is in capable hands
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main verification process */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Background Verification */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">Identity Verification</h3>
              <p className="text-gray-700 text-center">
                We verify the identity of every worker on our platform through government ID checks and facial recognition.
              </p>
              
              <div className="border-t border-gray-100 mt-6 pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <BadgeCheck size={18} className="text-red-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Government ID validation</span>
                  </li>
                  <li className="flex items-center">
                    <BadgeCheck size={18} className="text-red-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Criminal background checks</span>
                  </li>
                  <li className="flex items-center">
                    <BadgeCheck size={18} className="text-red-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Reference verification</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Skills Verification */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">Skills Assessment</h3>
              <p className="text-gray-700 text-center">
                We verify skills, certifications, and experience to match workers with appropriate opportunities in their field.
              </p>
              
              <div className="border-t border-gray-100 mt-6 pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <BadgeCheck size={18} className="text-red-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Industry-specific certification checks</span>
                  </li>
                  <li className="flex items-center">
                    <BadgeCheck size={18} className="text-red-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Experience verification</span>
                  </li>
                  <li className="flex items-center">
                    <BadgeCheck size={18} className="text-red-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Skills-based testing when applicable</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Performance Monitoring */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">Performance Monitoring</h3>
              <p className="text-gray-700 text-center">
                We track reliability and performance over time to ensure consistently high-quality service.
              </p>
              
              <div className="border-t border-gray-100 mt-6 pt-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <BadgeCheck size={18} className="text-red-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Post-job employer ratings</span>
                  </li>
                  <li className="flex items-center">
                    <BadgeCheck size={18} className="text-red-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Attendance and punctuality tracking</span>
                  </li>
                  <li className="flex items-center">
                    <BadgeCheck size={18} className="text-red-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Three-strike system for violations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Trust and reliability indicators */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
                <p className="text-gray-700">Of shifters complete identity verification</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">4.8/5</div>
                <p className="text-gray-700">Average worker rating from businesses</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">95%</div>
                <p className="text-gray-700">On-time arrival rate across all shifts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Verification;