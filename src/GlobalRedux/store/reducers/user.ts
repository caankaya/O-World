import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  pseudo: string | null;
}

const initialState: UserState = {
  pseudo: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (formInput: FormData) => {
    const obj = Object.fromEntries(formInput);
    const { data } = await axios.post('http://localhost:3000/login', obj);
    console.log('data :', data);
    return data;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state, action) => {
      console.log('state :', state);
      console.log('action :', action);
    })
    .addCase(login.fulfilled, (state, action) => {
      console.log('state :', state);
      console.log('action :', action);
    })
    .addCase(login.rejected, (state, action) => {
      console.log('state :', state);
      console.log('action :', action);
    });
});

export default userReducer;
