'use client';

// React Hooks
import { useEffect } from 'react';
// Redux Hooks
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
// Reducer Actions

// Components

import EarthInfos from '@/components/EarthInfos';
import { fetchEarthData } from '@/GlobalRedux/store/reducers/planet';
import SimpleLoader from '@/components/SimpleLoader';

const World = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.planet.loading);
  const earthData = useAppSelector((state) => state.planet.earthData);

  useEffect(() => {
    dispatch(fetchEarthData());
  }, [dispatch]);

  return loading || Object.keys(earthData).length === 0 ? (
    <SimpleLoader />
  ) : (
    <EarthInfos earthData={earthData} />
  );
};

export default World;
