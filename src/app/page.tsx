'use client';

import { useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import StarsCanvas from '@/components/Stars';
import WorldMap from '@/components/WorldMap';
import { openSideBar, setLoading } from '@/GlobalRedux/store/reducers/home'; // Importez l'action appropriée pour définir l'état spinner

export default function Home() {
  const dispatch = useAppDispatch();
  const override = useAppSelector((state) => state.home.override);
  const loading = useAppSelector((state) => state.home.spinner);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading(false));
      dispatch(openSideBar(true));
    }, 3000);
  }, [dispatch]);

  return (
    <main className="min-h-screen m-auto">
      <NavBar />
      <SideBar category={undefined} data={undefined} />
      {loading && (
        <RingLoader
          color={'#3abff8'}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Ring Loader"
          data-testid="Loader"
        />
      )}
      {!loading && <WorldMap />}
      <Footer />
      <StarsCanvas />
    </main>
  );
}
