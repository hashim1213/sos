'use client';

import { ReactNode } from 'react';
import { UserPathType } from '../../types';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  userPath: UserPathType;
  setUserPath: (path: UserPathType) => void;
}

const Layout = ({ children, userPath, setUserPath }: LayoutProps) => {
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