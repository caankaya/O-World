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
import FullPageLoader from '@/components/Loader';
import UpdateProfile from '@/components/UpdateProfile';
import UserFavorites from '@/components/UserFavorites';

export default function Page() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.home.spinner);
  const ProfileWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const favoritesCountries = useAppSelector(
    (state) => state.user.favoritesCountries
  );
  const flags = useAppSelector((state) => state.flags.flags);

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
      {loading ? (
        <FullPageLoader />
      ) : (
        <div
          className={`p-4 flex items-center justify-center gap-16 
    ${isSideBarOpen ? 'float-right' : ''}`}
          style={isSideBarOpen ? { width: ProfileWidth } : {}}
        >
          <UpdateProfile />
          <UserFavorites
            favoritesCountries={favoritesCountries}
            flags={flags}
          />
        </div>
      )}
    </>
  );
}
