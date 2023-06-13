'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';

import HyperspaceEffect from '@/components/HyperspaceEffect';
import Alert from '@/components/Alert';
import WorldMap from '@/components/WorldMap';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.user.alert);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // nettoyage
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <HyperspaceEffect />
      ) : (
        <>
          {alert && <Alert type={alert.type} message={alert.message} />}
          <WorldMap />
        </>
      )}
    </>
  );
}
