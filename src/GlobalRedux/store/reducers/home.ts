import { createAction, createReducer } from '@reduxjs/toolkit';

interface HomeState {
  sideBar: boolean;
  dropDown: boolean;
}

const initialState: HomeState = {
  sideBar: true,
  dropDown: false,
};

// Actions
export const togglerSideBar = createAction<boolean>('SideBar/toggle');
export const dropDown = createAction<boolean>('Profil/dropDown');

const homeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(togglerSideBar, (state) => {
      state.sideBar = !state.sideBar;
    })
    .addCase(dropDown, (state, action) => {
      state.dropDown = !state.dropDown;
    });
});

export default homeReducer;
