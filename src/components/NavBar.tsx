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
    <header className={`Header flex ${isSideBarOpen ? 'justify-end' : 'w-full'}`}>
      <nav
        className={`navbar z-[1] bg-transparent flex items-center justify-between w-full`}
        style={{ width: navBarWidth }}
      >
        <div className="flex mx-4">
          <button className="btn btn-square btn-ghost" onClick={toggleSideBar}>
            <img src="/ufo-svgrepo-com.svg" alt="ovni-icon" />
          </button>
        </div>
        <div className="hidden md:block w-full text-center">
          <AnimatedText text="Voici la planète terre, berceau de l'humanité" />
        </div>
        <div className="flex-none">
          <div className="avatar online m-2">
            <div
              className="w-12 rounded-full cursor-pointer"
              onClick={() => {
                toggleDropdown();
              }}
            >
              <img src="/alien-svgrepo-com.svg" alt="profil-picture" />
            </div>
            {isDropDownMenuOpen && (
              <div className="absolute right-0 top-16">
                <div className="bg-primary-content/50 shadow-xl flex flex-col rounded-lg">
                  <button
                    className="block py-4 px-12 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-t-lg"
                    onClick={toggleLoginModal}
                  >
                    LOGIN
                  </button>
                  <LoginModal />
                  <button
                    className="block py-4 px-12 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-b-lg"
                    onClick={toggleRegisterModal}
                  >
                    REGISTER
                  </button>
                  <RegisterModal />
                  <button className="block py-4 px-12 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg">
                    <a href="/profile">PROFILE</a>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
