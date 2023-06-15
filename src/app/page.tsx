'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';

import HyperspaceEffect from '@/components/HyperspaceEffect';
import Alert from '@/components/Alert';
import WorldMap from '@/components/WorldMap';
import { setLoading } from '@/GlobalRedux/store/reducers/home';
import StarsCanvas from '@/components/Stars';

export default function Home() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.spinner);
  const alert = useAppSelector((state) => state.user.alert);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000);

    return () => clearTimeout(timer); // nettoyage
  }, [dispatch]);

  return (
    // <>
    //   {loading ? (
    //     <HyperspaceEffect />
    //   ) : (
    <>
      <WorldMap />
      <StarsCanvas />
    </>
    // )}
    // </>
  );
}
