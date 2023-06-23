import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../GlobalRedux/hooks';
import { fetchFavoritesCountries } from '../../GlobalRedux/store/reducers/user';
import { setLoading } from '../../GlobalRedux/store/reducers/home';
import HyperspaceEffect from '../HyperspaceEffect';

import WorldMap from '../WorldMap';

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

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('Hyperspace');
    };

    const timer = setTimeout(() => {
      dispatch(setLoading(false));
      localStorage.setItem('Hyperspace', 'true');
    }, 3000);

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatch]);

  return loading && !localStorage.getItem('Hyperspace') ? (
    <HyperspaceEffect />
  ) : (
    <WorldMap favoritesCountries={favoritesCountries} isLogged={isLogged} />
  );
}
