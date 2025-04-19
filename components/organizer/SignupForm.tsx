'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { submitForm } from '../../utils/formHandlers';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const formData = {
        type: 'organizer' as const,
        email,
        eventType
      };

      const response = await submitForm(formData);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      // Success! Show confirmation 
      setSubmitted(true);

      // Reset form fields
      setEmail('');
      setEventType('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'} text-white font-bold py-3 px-6 rounded-lg transition shadow-lg`}
              >
                {isSubmitting ? 'Submitting...' : 'Join the Waitlist'}
              </button>

              {submitError && (
                <p className="mt-3 text-red-600 text-center">{submitError}</p>
              )}
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
  );
};

export default SignupForm;