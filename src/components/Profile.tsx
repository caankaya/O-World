'use client';

import { useAppSelector } from '@/GlobalRedux/hooks';

import UpdateProfile from './UpdateProfile';
import UserFavorites from './UserFavorites';

function Profile() {
  const ProfileWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  return (
    <div
      className={`p-4 flex items-center justify-center gap-16 ${
        isSideBarOpen ? 'float-right' : ''
      }`}
      style={isSideBarOpen ? { width: ProfileWidth } : {}}
    >
      <UpdateProfile />
      <UserFavorites />
    </div>
  );
}

export default Profile;
