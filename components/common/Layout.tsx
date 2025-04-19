'use client';

import { ReactNode } from 'react';
import { UserPathType } from '../../types';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  userPath: UserPathType; // Keep this in the interface
  setUserPath: (path: UserPathType) => void;
}

// Keep userPath in the component parameters to match the interface
const Layout = ({ children, setUserPath }: LayoutProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer setUserPath={setUserPath} />
    </div>
  );
};

export default Layout;