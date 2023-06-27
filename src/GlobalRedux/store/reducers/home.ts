import { createAction, createReducer } from '@reduxjs/toolkit';

interface HomeState {
  sideBar: boolean;
  dropDown: boolean;
  currentWidth: string;
  modalWidth: string;
  loginModal: boolean;
  registerModal: boolean;
  spinner: boolean;
}

const initialState: HomeState = {
  sideBar: false,
  dropDown: false,
  currentWidth: 'calc(100% - 256px)',
  modalWidth: 'calc(100% + 256px)',
  loginModal: false,
  registerModal: false,
  spinner: true,
};

/**
 * Action to toggle the sidebar.
 */
export const togglerSideBar = createAction<boolean>('SideBar/toggle');

/**
 * Action to toggle the dropdown in the profile.
 */
export const togglerDropDown = createAction<boolean>('Profil/dropDown');

/**
 * Action to toggle the login modal.
 */
export const togglerLoginModal = createAction<boolean>('LoginModal/toggle');

/**
 * Action to toggle the register modal.
 */
export const togglerRegisterModal = createAction<boolean>(
  'RegisterModal/toggle'
);

/**
 * Action to set the loading spinner state.
 */
export const setLoading = createAction<boolean>('Loading/spinner');

/**
 * Reducer for the home state.
 */
const homeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(togglerSideBar, (state) => {
      state.sideBar = !state.sideBar;
    })
    .addCase(togglerDropDown, (state) => {
      state.dropDown = !state.dropDown;
    })
    .addCase(togglerLoginModal, (state) => {
      state.loginModal = !state.loginModal;
    })
    .addCase(togglerRegisterModal, (state) => {
      state.registerModal = !state.registerModal;
    })
    .addCase(setLoading, (state, action) => {
      state.spinner = action.payload;
    });
});

export default homeReducer;
