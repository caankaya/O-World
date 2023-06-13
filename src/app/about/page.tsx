'use client';

import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import { setLoading } from '@/GlobalRedux/store/reducers/home';
import About from '@/components/About';
import Alert from '@/components/Alert';
import FullPageLoader from '@/components/Loader';
import React, { useEffect } from 'react';

export default function Page() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.spinner);
  const alert = useAppSelector((state) => state.user.alert);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000); // 3 secondes de délai

    return () => clearTimeout(timer); // Efface le timer si le composant est démonté
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          {alert && <Alert type={alert.type} message={alert.message} />}
          <About />
        </>
      )}
    </>
  );
}
