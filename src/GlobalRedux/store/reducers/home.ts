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
  sideBar: true,
  dropDown: false,
  currentWidth: 'calc(100% - 256px)',
  modalWidth: 'calc(100% + 256px)',
  loginModal: false,
  registerModal: false,
  spinner: true,
};

// Actions
export const togglerSideBar = createAction<boolean>('SideBar/toggle');
export const togglerDropDown = createAction<boolean>('Profil/dropDown');
export const togglerLoginModal = createAction<boolean>('LoginModal/toggle');
export const togglerRegisterModal = createAction<boolean>(
  'RegisterModal/toggle'
);
export const setLoading = createAction<boolean>('Loading/spinner');

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
