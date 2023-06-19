'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';

import {
  clearAlert,
  getToken,
  logout,
  messageUp,
} from '@/GlobalRedux/store/reducers/user';

import { clearUserAlert, logout } from '@/GlobalRedux/store/reducers/user';
import { logout } from '@/GlobalRedux/store/reducers/user';
import {
  togglerDropDown,
  togglerLoginModal,
  togglerRegisterModal,
  togglerSideBar,
} from '@/GlobalRedux/store/reducers/home';

import AnimatedText from '../utils/motion';

import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { useMediaQuery } from 'react-responsive';


const NavBar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.isLogged);
  const navBarWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const isDropDownMenuOpen = useAppSelector((state) => state.home.dropDown);
  const isLoginModalOpen = useAppSelector((state) => state.home.loginModal);
  const isRegisterModalOpen = useAppSelector(
    (state) => state.home.registerModal
  );


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(getToken(token));
    }
  }, [dispatch]);


  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  
  useEffect(() => {
    if (!isLargeScreen && isSideBarOpen) {
      dispatch(togglerSideBar(isSideBarOpen));
    }
  }, [isLargeScreen, isSideBarOpen, dispatch]);

  return (
    <header
      className="navbar bg-base-100 z-10 bg-transparent flex items-center justify-between"
      style={
        isSideBarOpen
            ? isLargeScreen
                ? { width: navBarWidth, float: 'right' }
                : { width: navBarWidth, float: 'right' }
            : {}
      }
    >
      <div className="navbar-container w-full">
        <nav
          className={`navbar bg-base-100 z-[1] bg-transparent flex items-center justify-between w-full`}
        >
          <div className="relative inline-block text-center">
          <button
            type="button"
            className="focus:outline-none"
            onClick={() => {
              dispatch(togglerSideBar(!isSideBarOpen));
            }}
          >
            <span
              className={`block h-1 w-6 bg-info-content rounded-full transition-all duration-1000 transform ${isSideBarOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-1 w-6 bg-info-content rounded-full mt-1 transition-all duration-1000 ${isSideBarOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-1 w-6 bg-info-content rounded-full mt-1 transition-all duration-1000 transform ${isSideBarOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
          </div>
          <div className="hidden md:block w-full text-center">
            <AnimatedText text="Voici la planète terre, berceau de l'humanité" />
          </div>
          <div className="flex-none">
            <div className={user ? `avatar m-2 online` : 'avatar m-2 offline'}>
              <button
                className="w-12 rounded-full cursor-pointer"
                onClick={() => {
                  dispatch(togglerDropDown(isDropDownMenuOpen));
                  dispatch(togglerSideBar(false));
                }}
              >
                <img src="/alien-svgrepo-com.svg" alt="profil-picture" />
              </button>
              {isDropDownMenuOpen && (
                <div className="absolute right-0 top-16">
                  <div className="bg-base-100/80 shadow-xl flex flex-col rounded-lg">
                    {!user && (
                      <ul>
                        <li>
                          <button
                            className="orbitron-font block py-4 px-12 w-full text-white font-semibold hover:text-xl hover:border hover-shadow-neon rounded-lg"
                            onClick={() => {
                              dispatch(togglerLoginModal(isLoginModalOpen));
                              
                            }}
                          >
                            LOGIN
                          </button>
                          <LoginModal />
                        </li>
                        <li>
                          <button
                            className="orbitron-font block py-4 px-12 w-full text-white font-semibold hover:text-xl hover:border hover-shadow-neon rounded-lg"
                            onClick={() => {
                              dispatch(
                                togglerRegisterModal(isRegisterModalOpen)
                              );
                            }}
                          >
                            REGISTER
                          </button>
                          <RegisterModal />
                        </li>
                      </ul>
                    )}
                    {user && (
                      <ul>
                        <li>
                          <button className="orbitron-font block py-4 px-12 text-white font-semibold hover:text-xl hover:border hover-shadow-neon rounded-lg">
                            <a href="/profile">PROFILE</a>
                          </button>
                          <button
                            onClick={() => {
                              dispatch(logout());
                              dispatch(togglerDropDown(isDropDownMenuOpen));
                              dispatch(togglerLoginModal(!isLoginModalOpen));
                            }}
                            className="orbitron-font block py-4 px-12 text-white font-semibold hover:text-xl hover:border hover-shadow-neon rounded-lg"
                          >
                            LOGOUT
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
