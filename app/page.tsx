'use client';

import { useState } from 'react';
import { UserPathType } from '../types';

// Common components
import Layout from '../components/common/Layout';
import Hero from '../components/home/Hero';
import Testimonials from '../components/home/Testimonials';

// Organizer components
import CommonScenarios from '../components/organizer/CommonScenarios';
import OrganizerHowItWorks from '../components/organizer/HowItWorks';
import Benefits from '../components/organizer/Benefits';
import OrganizerVerification from '../components/organizer/Verification';
import SignupForm from '../components/organizer/SignupForm';

// Professional components
import AboutSection from '../components/professional/AboutSection';
import ProfessionalHowItWorks from '../components/professional/HowItWorks';
import ProfessionalVerification from '../components/professional/Verification';
import ApplicationForm from '../components/professional/ApplicationForm';

export default function Home() {
  const [userPath, setUserPath] = useState<UserPathType>(null);

  return (
    <Layout userPath={userPath} setUserPath={setUserPath}>
      <Hero userPath={userPath} setUserPath={setUserPath} />
      
      {userPath === 'organizer' && (
        <>
          <CommonScenarios />
          <OrganizerHowItWorks />
          <Benefits />
          <OrganizerVerification />
          <SignupForm />
        </>
      )}

      {userPath === 'professional' && (
        <>
          <AboutSection />
          <ProfessionalHowItWorks />
          <ProfessionalVerification />
          <ApplicationForm />
        </>
      )}
      
      <Testimonials />
    </Layout>
  );
}