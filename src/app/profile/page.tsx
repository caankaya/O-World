'use client';

import Footer from '@/components/Footer';
import FullPageLoader from '@/components/Loader';
import LoginModal from '@/components/LoginModal';
import NavBar from '@/components/NavBar';
import Profile from '@/components/Profile';
import SideBar from '@/components/SideBar';
import StarsCanvas from '@/components/Stars';
import { Stars } from '@react-three/drei';
import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000); // 3 secondes de délai

    return () => clearTimeout(timer); // Efface le timer si le composant est démonté
  }, []);

  return (
    <React.Fragment>
      {showLoader ? (
        <>
          <FullPageLoader />
          <StarsCanvas />
        </>
      ) : (
        <>
        <NavBar />
        <SideBar category={undefined} data={undefined} />
        <LoginModal />
        <Profile />
        {/* <StarsCanvas /> */}
        <Footer />
      </>
      )}
    </React.Fragment>
  );
}
