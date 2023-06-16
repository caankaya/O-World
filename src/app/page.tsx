'use client';

// Reducer Actions
import { setLoading } from '@/GlobalRedux/store/reducers/home';
// Redux Hooks
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
// React Hooks
import { useEffect } from 'react';
// Components
import HyperspaceEffect from '@/components/HyperspaceEffect';
import WorldMap from '@/components/WorldMap';

export default function Home() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.spinner);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
      localStorage.setItem('Hyperspace', 'true');
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);
  return (
    <>
      {loading &&
      typeof localStorage !== 'undefined' &&
      !localStorage.getItem('Hyperspace') ? (
        <HyperspaceEffect />
      ) : (
        <>
          <WorldMap />
        </>
      )}
    </>
  );
}
