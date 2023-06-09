import { createAction, createReducer } from '@reduxjs/toolkit';

interface HomeState {
  sideBar: boolean;
  dropDown: boolean;
  currentWidth: string;
  modalWidth: string;
  loginModal: boolean;
  registerModal: boolean;
  override: {
    display: string;
    margin: string;
  };
  spinner: boolean;
}

const initialState: HomeState = {
  sideBar: true,
  dropDown: false,
  currentWidth: 'calc(100% - 256px)',
  modalWidth: 'calc(100% + 256px)',
  loginModal: false,
  registerModal: false,
  override: {
    display: 'block',
    margin: '15rem auto',
  },
  spinner: true,
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
export const changeStyle = createAction<{ display: string; margin: string }>(
  'style/Change'
);
export const setLoading = createAction<boolean>('Loading/spinner');

const homeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(togglerSideBar, (state) => {
      state.sideBar = !state.sideBar;
    })
    .addCase(dropDown, (state) => {
      state.dropDown = !state.dropDown;
    })
    .addCase(togglerLoginModal, (state) => {
      state.loginModal = !state.loginModal;
    })
    .addCase(togglerRegisterModal, (state) => {
      state.registerModal = !state.registerModal;
    })
    .addCase(setCurrentWidth, (state, action) => {
      state.currentWidth = action.payload;
    })
    .addCase(changeAuthModals, (state) => {
      state.loginModal = !state.loginModal;
      state.registerModal = !state.registerModal;
    })
    .addCase(changeStyle, (state, action) => {
      state.override = action.payload;
    })
    .addCase(setLoading, (state, action) => {
      state.spinner = action.payload;
    });
});

export default homeReducer;
