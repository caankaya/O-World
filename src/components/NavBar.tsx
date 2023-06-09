'use client';

import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
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
import React from 'react';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.isLogged);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const isDropDownMenuOpen = useAppSelector((state) => state.home.dropDown);
  const isLoginModalOpen = useAppSelector((state) => state.home.loginModal);
  const isRegisterModalOpen = useAppSelector(
    (state) => state.home.registerModal
  );
  const navBarWidth = useAppSelector((state) => state.home.currentWidth);

  return (
    <header
      className={`Header flex ${isSideBarOpen ? 'justify-end' : 'w-full'}`}
    >
      <nav
        className={`navbar bg-base-100 z-[1] bg-transparent flex items-center justify-between w-full`}
        style={isSideBarOpen ? { width: navBarWidth } : {}}
      >
        <div className="flex mx-4">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => {
              dispatch(togglerSideBar(!isSideBarOpen));
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
            <div
              className="w-12 rounded-full cursor-pointer"
              onClick={() => {
                dispatch(togglerDropDown(!isDropDownMenuOpen));
              }}
            >
              <img src="/alien-svgrepo-com.svg" alt="profil-picture" />
            </div>
            {isDropDownMenuOpen && (
              <div className="absolute right-0 top-16">
                <div className="bg-primary-content/50 shadow-xl flex flex-col rounded-lg">
                  {!user && (
                    <ul>
                      <li>
                        <button
                          className="block py-4 px-12 text-white font-semibold  hover:border-2 hover:border-primary-focus rounded-t-lg"
                          onClick={() => {
                            dispatch(togglerLoginModal(!isLoginModalOpen));
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
                              togglerRegisterModal(!isRegisterModalOpen)
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
                            dispatch(togglerDropDown(!isDropDownMenuOpen));
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
    </header>
  );
};

export default NavBar;
