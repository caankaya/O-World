/* eslint-disable no-nested-ternary */

import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../GlobalRedux/hooks';
import { fetchMercuryData } from '../../GlobalRedux/store/reducers/planet';

import MercuryInfos from '../MercuryInfos';
import SimpleLoader from '../SimpleLoader';

export default function Mercury() {
  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const planetWidth = useAppSelector((state) => state.home.currentWidth);
  const loading = useAppSelector((state) => state.planet.loading);
  const mercuryData = useAppSelector((state) => state.planet.mercuryData);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    dispatch(fetchMercuryData());
  }, [dispatch]);

  return loading ? (
    <SimpleLoader />
  ) : (
    <div
      className="p-8 orbitron-font flex flex-col items-center justify-center w-full gap-5"
      style={
        isSideBarOpen
          ? isLargeScreen
            ? { width: planetWidth, float: 'right' }
            : { width: '100%', float: 'none' }
          : {}
      }
    >
      <div className="xl:max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
          Mercury
        </h1>
      </div>
      <p className="px-4 md:px-16 text-justify">
        Mercury is the closest planet to the Sun and the smallest planet in the
        Solar System. Due to its proximity to the Sun, it has no atmosphere to
        retain heat, causing drastic temperature variations between day and
        night. Its surface is heavily cratered and resembles the Moon.
      </p>
      <MercuryInfos mercuryData={mercuryData} />
    </div>
  );
}
