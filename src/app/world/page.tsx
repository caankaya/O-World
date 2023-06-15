'use client';

// React Hooks
import { useEffect } from 'react';
// Redux Hooks
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
// Reducer Actions
import { setLoading } from '@/GlobalRedux/store/reducers/home';
// Components
import FullPageLoader from '@/components/Loader';
import Alert from '@/components/Alert';
import EarthInfos from '@/components/EarthInfos';
import { fetchEarthData } from '@/GlobalRedux/store/reducers/planet';

const World = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.spinner);
  const alert = useAppSelector((state) => state.user.alert);
  const earthData = useAppSelector((state) => state.planet.earthData);

  useEffect(() => {
    dispatch(fetchEarthData());

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
          <EarthInfos earthData={earthData} />
        </>
      )}
    </>
  );
};

export default World;
