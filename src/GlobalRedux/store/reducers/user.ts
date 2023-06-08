import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

interface UserState {
  pseudo: string | null;
  message: string;
  isLogged: boolean;
}

const initialState: UserState = {
  pseudo: null,
  isLogged: false,
  message: '',
};

export const login = createAsyncThunk(
  'user/login',
  async (formInput: FormData) => {
    const obj = Object.fromEntries(formInput);
    const response = await axiosInstance.post('/api/log/in', obj);
    console.log('data :', response);
    return response;
  }
);

export const logout = createAction('user/logout');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      // state.pseudo = action.payload.user.username;
      state.isLogged = true;
    })
    .addCase(logout, (state) => {
      state.isLogged = false;
      state.pseudo = null;
    });
});

export default userReducer;
