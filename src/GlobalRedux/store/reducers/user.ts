import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  pseudo: string | null;
  message: string;
  isLogged: boolean;
}

const initialState: UserState = {
  pseudo: null,
  message: '',
  isLogged: false,
};

export const login = createAsyncThunk(
  'user/login',
  async (formInput: FormData) => {
    const obj = Object.fromEntries(formInput);
    const { data } = await axios.post('http://localhost:3000/api/log/in', obj);
    console.log('data :', data);
    return data;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state, action) => {})
    .addCase(login.fulfilled, (state, action) => {
      console.log('action :', action);
      state.pseudo = action.payload.user.username;
      state.isLogged = true;
      console.log('state.pseudo :', state.pseudo);
      console.log('state.isLogged :', state.isLogged);
    })
    .addCase(login.rejected, (state, action) => {
      console.log('state :', state);
      console.log('action :', action);
    });
});

export default userReducer;
