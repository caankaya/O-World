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

export const fetchData = createAsyncThunk(
  'world/fetchData', // nom de l'action
  async () => {
    const response = await axios.get('http://localhost:3001/');
    return response.data;
  }
);

const worldReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchData.pending, (state, action) => {
      console.log('state :', state);
      console.log('action :', action);
    })
    .addCase(fetchData.fulfilled, (state, action) => {
      console.log('state :', state);
      console.log('action :', action);
    })
    .addCase(fetchData.rejected, (state, action) => {
      console.log('state :', state);
      console.log('action :', action);
    });
});

export default worldReducer;
