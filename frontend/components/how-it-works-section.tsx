export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How It Works</h2>
          <p className="mt-4 text-lg text-gray-500">Simple steps to find staff or work opportunities</p>
        </div>

        <div className="mt-16">
          <h3 className="mb-8 text-center text-2xl font-bold">For Event Organizers</h3>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                1
              </div>
              <h4 className="mb-2 text-lg font-semibold">Post Your Event</h4>
              <p className="text-gray-500">Describe your event and the staff you need</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                2
              </div>
              <h4 className="mb-2 text-lg font-semibold">Review Applicants</h4>
              <p className="text-gray-500">Browse profiles, ratings, and experience</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                3
              </div>
              <h4 className="mb-2 text-lg font-semibold">Hire & Confirm</h4>
              <p className="text-gray-500">Select your staff and confirm details</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                4
              </div>
              <h4 className="mb-2 text-lg font-semibold">Pay Securely</h4>
              <p className="text-gray-500">Payment is only released after successful completion</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="mb-8 text-center text-2xl font-bold">For Staff Members</h3>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                1
              </div>
              <h4 className="mb-2 text-lg font-semibold">Create Profile</h4>
              <p className="text-gray-500">Showcase your skills, experience, and availability</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                2
              </div>
              <h4 className="mb-2 text-lg font-semibold">Browse Opportunities</h4>
              <p className="text-gray-500">Find events that match your skills and schedule</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                3
              </div>
              <h4 className="mb-2 text-lg font-semibold">Apply & Confirm</h4>
              <p className="text-gray-500">Apply for positions and confirm details</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                4
              </div>
              <h4 className="mb-2 text-lg font-semibold">Get Paid</h4>
              <p className="text-gray-500">Receive secure payment after completing the job</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
