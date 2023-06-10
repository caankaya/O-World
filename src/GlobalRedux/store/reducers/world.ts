import { createReducer } from '@reduxjs/toolkit';

interface WorldState {
  world: [];
}

const initialState: WorldState = {
  world: [],
};

const worldReducer = createReducer(initialState, (builder) => {
  builder;
});

export default worldReducer;
