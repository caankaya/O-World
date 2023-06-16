'use client';

// React Hooks
import { useEffect } from 'react';
// Redux Hooks
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
// Reducer Action
import { setLoading } from '@/GlobalRedux/store/reducers/home';
// Component
import FullPageLoader from '@/components/Loader';
import Admin from '@/components/AdminComponents/Admin';
import Alert from '@/components/Alert';

export default function Page() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.spinner);
  const alert = useAppSelector((state) => state.stats.alert);

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
          {alert && 
          <div className="px-4 mx-auto w-full">
          <Alert type={alert.type} message={alert.message} />
          </div>}
          <Admin />
        </>
      )}
    </>
  );
}
