'use client';

// React Hooks
import { useEffect } from 'react';
// Redux Hooks
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
// Reducer Actions
import { setLoading } from '@/GlobalRedux/store/reducers/home';
// Components
import HyperspaceEffect from '@/components/HyperspaceEffect';
import WorldMap from '@/components/WorldMap';

export default function Home() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.spinner);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <HyperspaceEffect />
      ) : (
        <>
          <WorldMap />
        </>
      )}
    </>
  );
}
