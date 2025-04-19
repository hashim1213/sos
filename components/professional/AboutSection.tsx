import { Check } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Join the SOS Shifter Network</h2>

          <div className="bg-gray-50 p-8 rounded-lg shadow-md mb-12">
            <h3 className="text-xl font-bold mb-4 text-black">Why Work With SOS?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white mr-3">
                    <Check size={16} />
                  </div>
                  <h4 className="font-bold text-gray-600">Flexible Schedule</h4>
                </div>
                <p className="text-gray-700 pl-11">Work when you want, for events that fit your availability.</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white mr-3">
                    <Check size={16} />
                  </div>
                  <h4 className="font-bold text-gray-600">Competitive Pay</h4>
                </div>
                <p className="text-gray-700 pl-11">Earn premium rates, especially for emergency staffing needs.</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white mr-3">
                    <Check size={16} />
                  </div>
                  <h4 className="font-bold text-gray-600">Same-Day Payment</h4>
                </div>
                <p className="text-gray-700 pl-11">Get paid quickly after completing your assignments.</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white mr-3">
                    <Check size={16} />
                  </div>
                  <h4 className="font-bold text-gray-600">Build Your Reputation</h4>
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
  );
};

export default AboutSection;