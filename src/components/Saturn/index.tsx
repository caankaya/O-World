/* eslint-disable no-nested-ternary */

import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../GlobalRedux/hooks';
import { fetchSaturnData } from '../../GlobalRedux/store/reducers/planet';

import SaturnInfos from '../SaturnInfos';
import SimpleLoader from '../SimpleLoader';

export default function Saturn() {
  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const planetWidth = useAppSelector((state) => state.home.currentWidth);
  const loading = useAppSelector((state) => state.planet.loading);
  const saturnData = useAppSelector((state) => state.planet.saturnData);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    dispatch(fetchSaturnData());
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
          Saturn
        </h1>
      </div>
      <p className="px-4 md:px-16 text-justify">
        Saturn is the sixth planet from the Sun and is known for its stunning
        ring system made of ice particles, rocks, and dust. It is a gas giant
        like Jupiter, with a composition primarily of hydrogen and helium.
        Saturn has numerous moons, the largest being Titan.
      </p>
      <SaturnInfos saturnData={saturnData} />
    </div>
  );
}
