import { Clock, Shield, Layers, MapPin, DollarSign, BarChart } from 'lucide-react';

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Businesses Choose SOS</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform solves staffing challenges across multiple industries with speed, reliability, and flexibility
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-x-8 gap-y-12">
          {/* Last-Minute Solutions */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-5">
              <Clock size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Last-Minute Solutions</h3>
            <p className="text-gray-700">
              Emergency staffing when you need it most - even with just hours to spare. Our platform matches you with available workers instantly.
            </p>
          </div>
          
          {/* Vetted Shifters */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-5">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Vetted Shifters</h3>
            <p className="text-gray-700">
              Every worker is pre-screened and qualified. We verify identities, check references, and confirm skills and certifications for every industry.
            </p>
          </div>
          
          {/* All-in-One Platform */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-5">
              <Layers size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">All-in-One Platform</h3>
            <p className="text-gray-700">
              From hospitality staff to construction workers to retail associates - find all your staffing needs in one place without using multiple agencies.
            </p>
          </div>
          
          {/* Cost-Effective */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-5">
              <DollarSign size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Cost-Effective</h3>
            <p className="text-gray-700">
              Save up to 25% compared to traditional staffing agencies. Only pay for the hours you need, with no minimum requirements or long-term contracts.
            </p>
          </div>
          
          {/* Nationwide Coverage */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-5">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Nationwide Coverage</h3>
            <p className="text-gray-700">
              From weddings in Banff to construction in Vancouver to retail in Toronto - we've got Canada covered with workers in cities across the country.
            </p>
          </div>
          
          {/* Performance Insights */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-5">
              <BarChart size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Performance Insights</h3>
            <p className="text-gray-700">
              Access detailed reports on worker performance, attendance, and ratings. Build your own pool of preferred workers for future assignments.
            </p>
          </div>
        </div>
        
        {/* Testimonial/Highlight */}
        <div className="max-w-4xl mx-auto mt-16 bg-red-50 p-8 rounded-xl">
          <blockquote className="text-xl text-gray-700 italic text-center">
            "For a 4-hour shift with 5 workers, a traditional agency costs about $850. With SOS, the same quality staff costs just $625 — that's a <span className="font-bold text-red-600">26% savings</span> per event."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Benefits;