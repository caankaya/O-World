/* eslint-disable no-nested-ternary */

import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../GlobalRedux/hooks';
import { fetchJupiterData } from '../../GlobalRedux/store/reducers/planet';

import JupiterInfos from '../JupiterInfos';
import SimpleLoader from '../SimpleLoader';

export default function Jupiter() {
  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const planetWidth = useAppSelector((state) => state.home.currentWidth);
  const loading = useAppSelector((state) => state.planet.loading);
  const jupiterData = useAppSelector((state) => state.planet.jupiterData);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    dispatch(fetchJupiterData());
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
          Jupiter
        </h1>
      </div>
      <p className="px-4 md:px-16 text-justify">
        Jupiter is the fifth planet from the Sun and the largest in the Solar
        System. It is a gas giant, primarily composed of hydrogen and helium. It
        has a strong magnetic field and dozens of moons, including the four
        large Galilean moons: Io, Europa, Ganymede, and Callisto.
      </p>
      <JupiterInfos jupiterData={jupiterData} />
    </div>
  );
}
