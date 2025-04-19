'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { submitForm } from '../../utils/formHandlers';

const ApplicationForm = () => {
  const [professionalName, setProfessionalName] = useState('');
  const [professionalEmail, setProfessionalEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [skill, setSkill] = useState('');
  const [experience, setExperience] = useState('');
  const [aboutExperience, setAboutExperience] = useState('');
  const [agreeToCheck, setAgreeToCheck] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form submission status tracking
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const formData = {
        type: 'professional' as const,
        name: professionalName,
        email: professionalEmail,
        phone,
        city,
        skill,
        experience,
        aboutExperience,
        agreeToCheck
      };

      const response = await submitForm(formData);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      // Success! Show confirmation 
      setSubmitted(true);

      // Reset all form fields
      setProfessionalName('');
      setProfessionalEmail('');
      setPhone('');
      setCity('');
      setSkill('');
      setExperience('');
      setAboutExperience('');
      setAgreeToCheck(false);
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
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Ready to Join the SOS Network?</h2>
          <p className="text-lg text-center mb-8">
            Apply now to be among the first shifters on our platform when we launch.
          </p>

          {!submitted ? (
            <div className="bg-white p-6 rounded-lg shadow-xl text-left text-black">
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={professionalName}
                      onChange={(e) => setProfessionalName(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Email *</label>
                    <input
                      type="email"
                      value={professionalEmail}
                      onChange={(e) => setProfessionalEmail(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">City *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Primary Skill *</label>
                    <select
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    >
                      <option value="">Select your primary skill</option>
                      <option value="bartender">Bartender</option>
                      <option value="server">Server</option>
                      <option value="security">Security</option>
                      <option value="coordinator">Event Coordinator</option>
                      <option value="technical">Technical Support</option>
                      <option value="vendor">Vendor/Equipment Provider</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Years of Experience *</label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    >
                      <option value="">Select years</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">Tell us about your experience (Optional)</label>
                  <textarea
                    rows={3}
                    value={aboutExperience}
                    onChange={(e) => setAboutExperience(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Share your relevant skills and experience..."
                  ></textarea>
                </div>

                <div className="mb-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="background-check"
                      checked={agreeToCheck}
                      onChange={(e) => setAgreeToCheck(e.target.checked)}
                      className="mt-1 mr-2"
                      required
                    />
                    <label htmlFor="background-check" className="text-gray-700">
                      I understand SOS requires background checks and skills verification for all professionals *
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isSubmitting ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'} text-white font-bold py-3 px-6 rounded-lg transition shadow-lg`}
                >
                  {isSubmitting ? 'Submitting...' : 'Apply to Join'}
                </button>

                {submitError && (
                  <p className="mt-3 text-red-600 text-center">{submitError}</p>
                )}
              </form>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-red-600" size={32} />
              </div>
              <h3 className="text-gray-800 text-xl font-bold mb-2">Application Received!</h3>
              <p className="text-gray-600 mb-4">
                Thanks for your interest in joining the SOS professional network. We&apos;ll review your application and be in touch soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Submit another application
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;