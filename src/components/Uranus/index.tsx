/* eslint-disable no-nested-ternary */

import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../GlobalRedux/hooks';
import { fetchUranusData } from '../../GlobalRedux/store/reducers/planet';

import UranusInfos from '../UranusInfos';
import SimpleLoader from '../SimpleLoader';

export default function Uranus() {
  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const planetWidth = useAppSelector((state) => state.home.currentWidth);
  const loading = useAppSelector((state) => state.planet.loading);
  const uranusData = useAppSelector((state) => state.planet.uranusData);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    dispatch(fetchUranusData());
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
          Uranus
        </h1>
      </div>
      <p className="px-4 md:px-16 text-justify">
        Uranus is the seventh planet from the Sun and is known as an "ice
        giant". It has a bluish color due to the presence of methane in its
        atmosphere. Unlike other planets, Uranus has an extreme axial tilt,
        causing it to rotate on its side.
      </p>
      <UranusInfos uranusData={uranusData} />
    </div>
  );
}
