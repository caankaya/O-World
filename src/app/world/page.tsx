'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';

import { setLoading } from '@/GlobalRedux/store/reducers/home';

import FullPageLoader from '@/components/Loader';
import Alert from '@/components/Alert';
import EarthInfos from '@/components/EarthInfos';
import { fetchEarthData } from '@/GlobalRedux/store/reducers/earth';

const World = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.spinner);
  const alert = useAppSelector((state) => state.user.alert);
  const earthData = useAppSelector((state) => state.earth);

  useEffect(() => {
    dispatch(fetchEarthData({ url: '/oworld', params: { useView: false }}));

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
