import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { Alert } from '@/@types/alert';

interface UserState {
  username: string | null;
  message: string;
  isLogged: boolean;
  loading: boolean;
  sessionId: number | null;
  alert: Alert | null;
}

const initialState: UserState = {
  username: null,
  isLogged: false,
  message: '',
  sessionId: null,
  loading: false,
  alert: null,
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
    .addCase(login.pending, (state, action) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      const { id, username } = action.payload.data.session;
      state.isLogged = true;
      state.sessionId = id;
      state.username = username;
      sessionStorage.setItem('sessionId', id.toString());
      sessionStorage.setItem('username', username);
      state.alert = {
        type: 'success',
        message: `Welcome ${state.username}`,
      };
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isLogged = false;
      state.sessionId = null;
      state.username = null;
      state.alert = {
        type: 'error',
        message: action.error.code || 'UNKNOWN_ERROR',
      };
    })
    .addCase(logout, (state) => {
      state.isLogged = false;
      state.sessionId = null;
      state.username = null;
      sessionStorage.clear();
      sessionStorage.clear();
      state.alert = {
        type: 'success',
        message: 'You are disconnected',
      };
    });
});

export default userReducer;
