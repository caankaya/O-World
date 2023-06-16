'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import { clearUserAlert, logout } from '@/GlobalRedux/store/reducers/user';
import {
  togglerDropDown,
  togglerLoginModal,
  togglerRegisterModal,
  togglerSideBar,
} from '@/GlobalRedux/store/reducers/home';

import AnimatedText from '../utils/motion';

import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import Alert from './Alert';
import { clearStatsAlert } from '@/GlobalRedux/store/reducers/stats';
import { clearPlanetAlert } from '@/GlobalRedux/store/reducers/planet';
import { clearGraphAlert } from '@/GlobalRedux/store/reducers/graph';
import { clearFlagsAlert } from '@/GlobalRedux/store/reducers/flags';
import { clearCountryAlert } from '@/GlobalRedux/store/reducers/country';
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
  const alertUser = useAppSelector((state) => state.user.alert);
  const alertStats = useAppSelector((state) => state.stats.alert);
  const alertFlags = useAppSelector((state) => state.flags.alert);
  const alertPlanet = useAppSelector((state) => state.planet.alert);
  const alertCountry = useAppSelector((state) => state.country.alert);
  const alertGrah = useAppSelector((state) => state.graph.alert);

  useEffect(() => {
    if (
      alertUser ||
      alertStats ||
      alertPlanet ||
      alertFlags ||
      alertCountry ||
      alertGrah
    ) {
      const timeout = setTimeout(() => {
        dispatch(clearUserAlert());
        dispatch(clearStatsAlert());
        dispatch(clearPlanetAlert());
        dispatch(clearGraphAlert());
        dispatch(clearFlagsAlert());
        dispatch(clearCountryAlert());
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [
    alertUser,
    alertStats,
    alertPlanet,
    alertFlags,
    alertCountry,
    alertGrah,
    dispatch,
  ]);

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
          <div className="flex mx-4">
            <button aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => {
              dispatch(togglerSideBar(isSideBarOpen));
            }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
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
                }}
              >
                <img src="/alien-svgrepo-com.svg" alt="profil-picture" />
              </button>
              {isDropDownMenuOpen && (
                <div className="absolute right-0 top-16">
                  <div className="bg-base-100/50 shadow-xl flex flex-col rounded-lg">
                    {!user && (
                      <ul>
                        <li>
                          <button
                            className="block py-4 px-12 w-full text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-t-lg"
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
                            className="block py-4 px-12 w-full text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-b-lg"
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
                          <button className="block py-4 px-12 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg">
                            <a href="/profile">PROFILE</a>
                          </button>
                          <button
                            onClick={() => {
                              dispatch(logout());
                              dispatch(togglerDropDown(isDropDownMenuOpen));
                              dispatch(togglerLoginModal(!isLoginModalOpen));
                            }}
                            className="block py-4 px-12 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-lg"
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
        {alertUser && (
          <Alert type={alertUser.type} message={alertUser.message} />
        )}
        {alertStats && (
          <Alert type={alertStats.type} message={alertStats.message} />
        )}
        {alertPlanet && (
          <Alert type={alertPlanet.type} message={alertPlanet.message} />
        )}
        {alertFlags && (
          <Alert type={alertFlags.type} message={alertFlags.message} />
        )}
        {alertCountry && (
          <Alert type={alertCountry.type} message={alertCountry.message} />
        )}
        {alertGrah && (
          <Alert type={alertGrah.type} message={alertGrah.message} />
        )}
      </div>
    </header>
  );
};

export default NavBar;
