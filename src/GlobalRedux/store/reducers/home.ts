import { createAction, createReducer } from '@reduxjs/toolkit';

interface HomeState {
  sideBar: boolean;
  dropDown: boolean;
  currentWidth: string

}

const initialState: HomeState = {
  sideBar: true,
  dropDown: false,
  currentWidth: "calc(100% - 256px)",
};

// Actions
export const togglerSideBar = createAction<boolean>('SideBar/toggle');
export const dropDown = createAction<boolean>('Profil/dropDown');
export const setCurrentWidth = createAction<string>('NavBar/setNavWidth');

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
    });
});

export default homeReducer;
