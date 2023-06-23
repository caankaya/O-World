/* eslint-disable no-nested-ternary */

import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../GlobalRedux/hooks';
import { fetchNeptuneData } from '../../GlobalRedux/store/reducers/planet';

import NeptuneInfos from '../NeptuneInfos';
import SimpleLoader from '../SimpleLoader';

export default function Neptune() {
  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const planetWidth = useAppSelector((state) => state.home.currentWidth);
  const loading = useAppSelector((state) => state.planet.loading);
  const neptuneData = useAppSelector((state) => state.planet.neptuneData);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    dispatch(fetchNeptuneData());
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
          Neptune
        </h1>
      </div>
      <p className="px-4 md:px-16 text-justify">
        Neptune is the eighth and farthest planet from the Sun in the Solar
        System. Like Uranus, it is classified as an ice giant and has a deep
        blue color due to the methane in its atmosphere. Neptune has a dynamic
        atmosphere with large storms and high-speed winds. It has several moons,
        with Triton being the largest.
      </p>
      <NeptuneInfos neptuneData={neptuneData} />
    </div>
  );
}
