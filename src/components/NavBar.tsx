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
import { clearInfosAlert } from '@/GlobalRedux/store/reducers/infos';

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
  const alertInfos = useAppSelector((state) => state.infos.alert);

  useEffect(() => {
    if (
      alertUser ||
      alertStats ||
      alertPlanet ||
      alertFlags ||
      alertCountry ||
      alertGrah ||
      alertInfos
    ) {
      const timeout = setTimeout(() => {
        dispatch(clearUserAlert());
        dispatch(clearStatsAlert());
        dispatch(clearPlanetAlert());
        dispatch(clearGraphAlert());
        dispatch(clearFlagsAlert());
        dispatch(clearCountryAlert());
        dispatch(clearInfosAlert());
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
    alertInfos,
    dispatch,
  ]);

  return (
    <header
      className={`Header flex`}
      style={isSideBarOpen ? { width: navBarWidth, float: 'right' } : {}}
    >
      <div className="navbar-container w-full">
        <nav
          className={`navbar bg-base-100 z-[1] bg-transparent flex items-center justify-between w-full`}
        >
          <div className="flex mx-4">
            <button
              className="btn btn-square btn-ghost hover:bg-base-100"
              onClick={() => {
                dispatch(togglerSideBar(isSideBarOpen));
              }}
            >
              <img src="/ufo-svgrepo-com.svg" alt="ovni-icon" />
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
                            className="block py-4 px-12 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-t-lg"
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
                            className="block py-4 px-12 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-b-lg"
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
        {alertInfos && (
          <Alert type={alertInfos.type} message={alertInfos.message} />
        )}
      </div>
    </header>
  );
};

export default NavBar;
