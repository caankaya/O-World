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
import AnimatedText from '@/utils/motion';

const World = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.planet.loading);
  const earthData = useAppSelector((state) => state.planet.earthData);

  useEffect(() => {
    dispatch(fetchEarthData());
  }, [dispatch]);

  return loading ? (
    <SimpleLoader />
  ) : (
    <>
      <div className="xl:max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl text-white font-bold tracking-tighter leading-tight">
          Planet Earth information
        </h1>
        <AnimatedText text="TEAM" />
        <p className="text-lg md:text-xl text-white font-medium">
          General review of this alien planet
        </p>
      </div>
      <EarthInfos earthData={earthData} />
    </>
  );
};

export default World;
