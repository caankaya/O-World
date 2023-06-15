'use client';

// Reducer Actions
import { setLoading } from '@/GlobalRedux/store/reducers/home';
// Redux Hooks
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
// React Hooks
import { useEffect } from 'react';
// Component
import FullPageLoader from '@/components/Loader';
import About from '@/components/About';

export default function Page() {
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
        <FullPageLoader />
      ) : (
        <>
          <About />
        </>
      )}
    </>
  );
}
