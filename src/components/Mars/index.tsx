/* eslint-disable no-nested-ternary */

import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../GlobalRedux/hooks';
import { fetchMarsData } from '../../GlobalRedux/store/reducers/planet';

import MarsInfos from '../MarsInfos';
import SimpleLoader from '../SimpleLoader';

export default function Mars() {
  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const planetWidth = useAppSelector((state) => state.home.currentWidth);
  const loading = useAppSelector((state) => state.planet.loading);
  const marsData = useAppSelector((state) => state.planet.marsData);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    dispatch(fetchMarsData());
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
          Mars
        </h1>
      </div>
      <p className="px-4 md:px-16 text-justify">
        Mars, often referred to as the "Red Planet", is the fourth planet from
        the Sun. It has a thin atmosphere mainly composed of carbon dioxide.
        Mars features the tallest mountain and the deepest canyon in the Solar
        System. It has two moons, Phobos and Deimos, and is a target for future
        human exploration.
      </p>
      <MarsInfos marsData={marsData} />
    </div>
  );
}
