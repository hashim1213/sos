const Verification = () => {
  return (
    <section id="verification" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">Our Verification Process</h2>
        <p className="text-lg text-center mb-12 text-gray-700 max-w-3xl mx-auto">
          We maintain high standards to ensure quality opportunities for our Shifters. Here&apos;s what to expect:
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
  );
};

export default Verification;