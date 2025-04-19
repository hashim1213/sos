import { User } from 'lucide-react';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-black">Success Stories</h2>
        <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          Hear what our event organizers and shifters staff have to say about their experience with SOS.
        </p>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Festival Coordinator Testimonial */}
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-600 transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4 text-white">
                <User size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Jordan M.</h4>
                <p className="text-sm text-red-600 font-medium">Festival Coordinator</p>
              </div>
            </div>
            <p className="text-gray-800">&quot;When 3 security staff canceled the day before our festival, SOS saved us. Within hours, we had qualified replacements ready to work.&quot;</p>
          </div>
          
          {/* Wedding Planner Testimonial */}
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-600 transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4 text-white">
                <User size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Sarah L.</h4>
                <p className="text-sm text-red-600 font-medium">Wedding Planner</p>
              </div>
            </div>
            <p className="text-gray-800">&quot;I used to spend days finding reliable bartenders and servers. Now with SOS, I can book vetted staff in minutes. A game-changer!&quot;</p>
          </div>
          
          {/* Bartender Testimonial */}
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-600 transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4 text-white">
                <User size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Kevin T.</h4>
                <p className="text-sm text-red-600 font-medium">Bartender</p>
              </div>
            </div>
            <p className="text-gray-800">&quot;SOS has connected me with quality gigs that fit my schedule. The verification process was thorough but worth it for the premium opportunities.&quot;</p>
          </div>
        </div>
        
       
      </div>
    </section>
  );
};

export default Testimonials;