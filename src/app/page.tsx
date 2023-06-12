'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';

import WorldMap from '@/components/WorldMap';
import { setLoading } from '@/GlobalRedux/store/reducers/home';
import StarsCanvas from '@/components/Stars';
import HyperspaceEffect from '@/components/HyperspaceEffect';
import { Loader } from '@react-three/drei';
import Alert from '@/components/Alert';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const alert = useAppSelector((state) => state.user.alert);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // nettoyage
  }, [dispatch]);

  return (
    <main className="min-h-screen m-auto">
      {loading ? (
        <HyperspaceEffect />
      ) : (
        <>
          {alert && <Alert type={alert.type} message={alert.message} />}
          <NavBar />
          <SideBar category={undefined} data={undefined} />
          <WorldMap />
          <Footer />
          <StarsCanvas />
        </>
      )}
    </main>
  );
}
