'use client';

import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import { setLoading } from '@/GlobalRedux/store/reducers/home';
import Footer from '@/components/Footer';
import FullPageLoader from '@/components/Loader';
import LoginModal from '@/components/LoginModal';
import NavBar from '@/components/NavBar';
import Profile from '@/components/Profile';
import SideBar from '@/components/SideBar';
import StarsCanvas from '@/components/Stars';
import { Stars } from '@react-three/drei';
import { data } from 'autoprefixer';
import React, { useEffect } from 'react';

export default function Page() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.spinner);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000); // 3 secondes de délai

    return () => clearTimeout(timer); // Efface le timer si le composant est démonté
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading ? (
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
