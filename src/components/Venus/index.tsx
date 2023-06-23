/* eslint-disable no-nested-ternary */

import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../GlobalRedux/hooks';
import { fetchVenusData } from '../../GlobalRedux/store/reducers/planet';

import VenusInfos from '../VenusInfos';
import SimpleLoader from '../SimpleLoader';

export default function Earth() {
  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const planetWidth = useAppSelector((state) => state.home.currentWidth);
  const loading = useAppSelector((state) => state.planet.loading);
  const venusData = useAppSelector((state) => state.planet.venusData);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    dispatch(fetchVenusData());
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
          Venus
        </h1>
      </div>
      <p className="px-4 md:px-16 text-justify">
        Venus is the second planet from the Sun and is similar in size and
        composition to Earth. It has a thick, toxic atmosphere mainly composed
        of carbon dioxide with clouds of sulfuric acid. The surface pressure is
        extremely high, and the temperature is hot enough to melt lead.
      </p>
      <VenusInfos venusData={venusData} />
    </div>
  );
}
