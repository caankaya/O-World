import { createAction, createReducer } from '@reduxjs/toolkit';
import { create } from 'domain';

interface HomeState {
  sideBar: boolean;
  dropDown: boolean;
  currentWidth: string;
  loginModal: boolean;
  registerModal: boolean;
}

const initialState: HomeState = {
  sideBar: true,
  dropDown: false,
  currentWidth: 'calc(100% - 256px)',
  loginModal: false,
  registerModal: false,
};

// Actions
export const togglerSideBar = createAction<boolean>('SideBar/toggle');
export const dropDown = createAction<boolean>('Profil/dropDown');
export const setCurrentWidth = createAction<string>('NavBar/setNavWidth');
export const togglerLoginModal = createAction<boolean>('LoginModal/toggle');
export const togglerRegisterModal = createAction<boolean>(
  'RegisterModal/toggle'
);
export const changeAuthModals = createAction<boolean>('AuthModals/change');

const homeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(togglerSideBar, (state) => {
      state.sideBar = !state.sideBar;
    })
    .addCase(dropDown, (state) => {
      state.dropDown = !state.dropDown;
    })
    .addCase(setCurrentWidth, (state, action) => {
      state.currentWidth = action.payload;
    })
    .addCase(togglerLoginModal, (state) => {
      state.loginModal = !state.loginModal;
    })
    .addCase(togglerRegisterModal, (state) => {
      state.registerModal = !state.registerModal;
    })
    .addCase(changeAuthModals, (state) => {
      state.loginModal = !state.loginModal;
      state.registerModal = !state.registerModal;
    });
});

export default homeReducer;
