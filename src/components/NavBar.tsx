'use client';

import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks';
import { dropDown, setNavWidth, togglerSideBar } from '@/GlobalRedux/store/reducers/home';
import { useState } from 'react';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const isDropDownMenuOpen = useAppSelector((state) => state.home.dropDown);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);
  const navWidth = useAppSelector(state => state.home.navWidth)


  function toggleDropdown() {
    dispatch(dropDown(!isDropDownMenuOpen));
  }

  function toggleSideBar() {
    dispatch(togglerSideBar(!isSideBarOpen));
    dispatch(setNavWidth(isSideBarOpen ? "100%" : "calc(100% - 256px)" ));
  }

  return (
    <div className="Header flex justify-end">
      <nav className={`navbar bg-base-100 z-[1] bg-transparent flex items-center justify-between`} style={{ width: navWidth }}>

        <div className="flex mx-4">
          <button className="btn btn-square btn-ghost" onClick={toggleSideBar}>
            <img src="/ufo-svgrepo-com.svg" alt="ovni-icon" />
          </button>
        </div>
        <div className="flex-auto">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered input-primary input-sm w-full max-w-sm"
          />
          <button className="mx-4 btn btn-outline btn-primary btn-sm">OK</button>
        </div>
        <div className="flex justify-center w-full">
          <p className="alien-font shadow-neon text-[22px] tracking-[0.5em]">
            texte anime extraterrestre
          </p>
        </div>
        <div className="flex-none">
          <div className="avatar m-2">
            <div
              className="w-10 rounded-full ring ring-primary cursor-pointer"
              onClick={() => {
                toggleDropdown();
              }}
            >
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="profil-picture"
              />
            </div>
            {isDropDownMenuOpen && (
              <div className="absolute right-0 w-48 mt-16 py-2 bg-neutral rounded-lg shadow-xl">
                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-indigo-500 hover:text-white"
                >
                  Option 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-primary hover:bg-indigo-500 hover:text-white"
                >
                  Option 2
                </a>
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
    </div>
  );
};

export default NavBar;
