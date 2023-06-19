'use client';

// React Hooks
import { useEffect } from 'react';
// Redux Hooks
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
// Reducer Actions
import { setLoading } from '@/GlobalRedux/store/reducers/home';
// Components
import HyperspaceEffect from '@/components/HyperspaceEffect';
import WorldMap from '@/components/WorldMap';
import { fetchFavoritesCountries } from '@/GlobalRedux/store/reducers/user';

export default function Home() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.home.spinner);
  const favoritesCountries = useAppSelector(
    (state) => state.user.favoritesCountries
  );
  const isLogged = useAppSelector((state) => state.user.isLogged);

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchFavoritesCountries());
    }
  }, [dispatch, isLogged]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     dispatch(setLoading(false));
  //     localStorage.setItem('Hyperspace', 'true');
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [dispatch]);
  return (
    <>
      {/* {loading && !localStorage.getItem('Hyperspace') ? (
        <HyperspaceEffect />
      ) : ( */}
      <WorldMap favoritesCountries={favoritesCountries} isLogged={isLogged} />
      {/* )} */}
    </>
  );
}
