'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import { setLoading } from '@/GlobalRedux/store/reducers/home';
import { fetchFlagsData } from '@/GlobalRedux/store/reducers/flags';
import { fetchFavoritesCountries } from '@/GlobalRedux/store/reducers/user';
import { handleError } from '@/GlobalRedux/store/reducers/user';

import UpdateProfile from '@/components/UpdateProfile';
import UserFavorites from '@/components/UserFavorites';
import SimpleLoader from '@/components/SimpleLoader';
import AnimatedText from '@/utils/motion';

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const profileWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const favoritesCountries = useAppSelector(
    (state) => state.user.favoritesCountries
  );
  const flags = useAppSelector((state) => state.flags.flags);
  const loadingFavorites = useAppSelector((state) => state.user.loading);
  const loadingFlags = useAppSelector((state) => state.flags.loading);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  const isLogged = useAppSelector((state) => state.user.isLogged);
  const roles = useAppSelector((state) => state.user.roles);


  useEffect(() => {
    if (!isLogged || !roles.includes('User')) {
      router.push('/');
      dispatch(
        handleError(
          'You are not authorized to view this page.'
        )
      );
    }
  }, [isLogged, roles, router, dispatch]);
  
  if (!isLogged || !roles.includes('User')) {
    return; 
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFavoritesCountries());
      await dispatch(fetchFlagsData());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <>
      <div
        className="p-8 flex flex-col items-center justify-start min-h-screen orbitron-font gap-5"
        style={
          isSideBarOpen
            ? isLargeScreen
              ? { width: profileWidth, float: 'right' }
              : { width: '100%', float: 'none' }
            : {}
        }
      >
        <div className="xl:max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
            Username
          </h1>
          <AnimatedText text="TEAM" />
        </div>
        <UpdateProfile />
        {loadingFavorites || loadingFlags ? (
          <SimpleLoader />
        ) : (
          <>
            <div className="xl:max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-7xl gradient-text font-bold tracking-widest leading-tight">
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
      </div>
    </>
  );
}
