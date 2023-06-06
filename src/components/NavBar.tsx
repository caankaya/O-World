'use client';

import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import {
  dropDown,
  setCurrentWidth,
  togglerLoginModal,
  togglerRegisterModal,
  togglerSideBar,
} from '@/GlobalRedux/store/reducers/home';
import AnimatedText from '../utils/motion';

import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const isDropDownMenuOpen = useAppSelector((state) => state.home.dropDown);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const navBarWidth = useAppSelector((state) => state.home.currentWidth);
  const isLoginModalOpen = useAppSelector((state) => state.home.loginModal);
  const isRegisterModalOpen = useAppSelector(
    (state) => state.home.registerModal
  );

  function toggleDropdown() {
    dispatch(dropDown(!isDropDownMenuOpen));
  }

  function toggleSideBar() {
    dispatch(togglerSideBar(!isSideBarOpen));
    dispatch(setCurrentWidth(isSideBarOpen ? '100%' : 'calc(100% - 256px)'));
  }

  function toggleLoginModal() {
    dispatch(togglerLoginModal(!isLoginModalOpen));
  }

  function toggleRegisterModal() {
    dispatch(togglerRegisterModal(!isRegisterModalOpen));
  }

  return (
    <header className={`Header flex ${isSideBarOpen && 'justify-end'}`}>
      <nav
        className={`navbar bg-base-100 z-[1] bg-transparent flex items-center justify-between`}
        style={{ width: navBarWidth }}
      >
        <div className="flex mx-4">
          <button className="btn btn-square btn-ghost" onClick={toggleSideBar}>
            <img src="/ufo-svgrepo-com.svg" alt="ovni-icon" />
          </button>
        </div>
        <div className="flex-auto">
          <input
            type="text"
            placeholder="Search..."
            className="alien-font input input-bordered input-primary input-sm w-full max-w-sm bg-transparent"
          />
          <button className="alien-font mx-4 btn btn-outline btn-primary btn-sm">
            OK
          </button>
        </div>
        <div className="flex-auto w-full">
          <AnimatedText />
        </div>
        <div className="flex-none">
          <div className="avatar online m-2">
            <div
              className="w-12 rounded-full cursor-pointer"
              onClick={() => {
                toggleDropdown();
              }}
            >
              <img
                src="/alien-svgrepo-com.svg"
                alt="profil-picture"
              />
            </div>
            {isDropDownMenuOpen && (
              <div className="absolute right-0 w-48 mt-16 py-2 bg-neutral rounded-lg shadow-xl">
                <button
                  className="block px-4 py-2 text-primary hover:bg-indigo-500 hover:text-white"
                  onClick={toggleLoginModal}
                >
                  Login
                </button>
                <LoginModal />
                <button
                  className="block px-4 py-2 text-primary hover:bg-indigo-500 hover:text-white"
                  onClick={toggleRegisterModal}
                >
                  Register
                </button>
                <RegisterModal />

                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-indigo-500 hover:text-white"
                >
                  Option 3
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
