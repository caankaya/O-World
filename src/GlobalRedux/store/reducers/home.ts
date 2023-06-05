import { createAction, createReducer } from '@reduxjs/toolkit';

interface HomeState {
  sideBar: boolean;
}

const initialState: HomeState = {
  sideBar: true,
};

export const togglerSideBar = createAction<boolean>('SideBar/toggle');

const homeReducer = createReducer(initialState, (builder) => {
  builder.addCase(togglerSideBar, (state, action) => {
    state.sideBar = action.payload;
  });
});

export default homeReducer;
