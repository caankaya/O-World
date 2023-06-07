import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axios from 'axios';

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
