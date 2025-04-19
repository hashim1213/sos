const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">How SOS Works for Shifters</h2>

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
  );
};

export default HowItWorks;