'use client';

// React Hooks
import { useEffect } from 'react';
// Redux Hooks
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
// Reducer Actions
import { setLoading } from '@/GlobalRedux/store/reducers/home';
import { fecthFavoritesCountries } from '@/GlobalRedux/store/reducers/user';
import { fetchFlagsData } from '@/GlobalRedux/store/reducers/flags';
// Components
import UpdateProfile from '@/components/UpdateProfile';
import UserFavorites from '@/components/UserFavorites';
import SimpleLoader from '@/components/SimpleLoader';
import AnimatedText from '@/utils/motion';

export default function Page() {
  const dispatch = useAppDispatch();

  const ProfileWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const favoritesCountries = useAppSelector(
    (state) => state.user.favoritesCountries
  );
  const flags = useAppSelector((state) => state.flags.flags);
  const loadingFavorites = useAppSelector((state) => state.user.loading);
  const loadingFlags = useAppSelector((state) => state.flags.loading);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fecthFavoritesCountries());
      await dispatch(fetchFlagsData());
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000); // 3 secondes de délai

    return () => clearTimeout(timer); // Efface le timer si le composant est démonté
  }, [dispatch]);

  return (
    <>
      <UpdateProfile />
      {loadingFavorites || loadingFlags ? (
        <SimpleLoader />
      ) : (
        <>
          <div className="xl:max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl text-white font-bold tracking-tighter leading-tight">
              Favorite alien countries
            </h1>
            <AnimatedText text="TEAM" />
            <p className="text-lg md:text-xl text-white font-medium">
              Find your favorite countries
            </p>
          </div>
          <UserFavorites
            favoritesCountries={favoritesCountries}
            flags={flags}
          />
        </>
      )}
    </>
  );
}
