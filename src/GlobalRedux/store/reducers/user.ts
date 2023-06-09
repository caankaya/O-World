import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

interface UserState {
  username: string | null;
  message: string;
  isLogged: boolean;
  sessionId: number | null;
}

const initialState: UserState = {
  username: null,
  isLogged: false,
  message: '',
  sessionId: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (formInput: FormData) => {
    const obj = Object.fromEntries(formInput);
    const response = await axiosInstance.post('/api/log/in', obj);
    return response;
  }
);

export const logout = createAction('user/logout');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      const { id, username } = action.payload.data.session;
      state.isLogged = true;
      state.sessionId = id;
      state.username = username;
      sessionStorage.setItem('sessionId', id.toString());
      sessionStorage.setItem('username', username);
    })
    .addCase(logout, (state) => {
      state.isLogged = false;
      state.sessionId = null;
      state.username = null;
      sessionStorage.removeItem('sessionId');
      sessionStorage.removeItem('username');
    });
});

export default userReducer;
