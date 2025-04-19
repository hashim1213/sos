import { AlertTriangle, Calendar, Users, Building } from 'lucide-react';

const CommonScenarios = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">When You Need Staff Now</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              SOS helps businesses solve staffing challenges across multiple industries
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Event Scenario */}
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-red-600">
              <div className="flex items-start">
                <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mr-5 flex-shrink-0">
                  <AlertTriangle size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900">Events &amp; Hospitality</h3>
                  <p className="text-gray-700 italic mb-4">"Half my staff just canceled for tomorrow's event!"</p>
                  <p className="text-gray-600">With SOS, find vetted, qualified replacements within hours. Get bartenders, servers, security, and setup crews when you need them most.</p>
                </div>
              </div>
            </div>
            
            {/* Construction Scenario */}
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-red-600">
              <div className="flex items-start">
                <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mr-5 flex-shrink-0">
                  <Building size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900">Construction &amp; Labor</h3>
                  <p className="text-gray-700 italic mb-4">"I need five more workers on the construction site by tomorrow morning."</p>
                  <p className="text-gray-600">SOS can provide qualified labor for your construction site with little notice. Fill gaps in your crew and keep projects on schedule.</p>
                </div>
              </div>
            </div>
            
            {/* Festival Scenario */}
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-red-600">
              <div className="flex items-start">
                <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mr-5 flex-shrink-0">
                  <Calendar size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900">Large-Scale Events</h3>
                  <p className="text-gray-700 italic mb-4">"I need 300 people for the Winnipeg Folk Festival in three days."</p>
                  <p className="text-gray-600">SOS can scale to help you staff large events on short notice. Our platform efficiently matches hundreds of qualified workers to your requirements.</p>
                </div>
              </div>
            </div>
            
            {/* Retail Scenario */}
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-red-600">
              <div className="flex items-start">
                <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mr-5 flex-shrink-0">
                  <Users size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900">Retail &amp; Warehouse</h3>
                  <p className="text-gray-700 italic mb-4">"We just received a huge unexpected order and need extra hands in the warehouse."</p>
                  <p className="text-gray-600">From seasonal rushes to unexpected demand, SOS connects you with retail associates and warehouse workers to handle increased workload.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="#signup" className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition shadow-md text-lg">
              Get Staff Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonScenarios;