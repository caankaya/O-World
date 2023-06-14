import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { Alert } from '@/@types/alert';
import { create } from 'domain';

interface UserState {
  username: string | null;
  isLogged: boolean;
  loading: boolean;
  sessionId: number | null;
  alert: Alert | null;
}

const initialState: UserState = {
  username: null,
  isLogged: false,
  sessionId: null,
  loading: false,
  alert: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (formInput: FormData) => {
    const obj = Object.fromEntries(formInput);
    const response = await axiosInstance.post('/log/in', obj);
    console.log('response :', response);
    return response;
  }
);

export const logout = createAction('user/logout');
export const clearAlert = createAction('user/clearAlert');

export const register = createAsyncThunk(
  'user/register',
  async (formInput: FormData) => {
    const obj = Object.fromEntries(formInput);
    const response = await axiosInstance.post('/user', obj);
    return response;
  }
);

export const handleError = createAction<string>('user/handleError');
export const messageUp = createAction<boolean>('message/popUp');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state, action) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      const { id, username, roles } = action.payload.data.session;
      state.isLogged = true;
      state.sessionId = id;
      state.username = username;
      if (roles && roles.includes('Admin')) {
        sessionStorage.setItem('userType', 'Admin');
      } else {
        sessionStorage.setItem('userType', 'User');
      }

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
        //TODO Envoyer une erreur spécifique côté back si les identifiants sont incorrects/inexistants
        message: action.error.message ?? 'Unknown error occurred.',
      };
    })

    .addCase(logout, (state) => {
      state.isLogged = false;
      state.sessionId = null;
      state.username = null;
      sessionStorage.clear();
      state.alert = {
        type: 'success',
        message: 'You are disconnected',
      };
    })

    .addCase(register.pending, (state, action) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'success',
        message: `Your account has been created and you can now log in.`,
      };
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.alert = {
        //TODO Envoyer une erreur spécifique côté back si les identifiants sont déjà pris
        type: 'error',
        message: action.error.message ?? 'Unknown error occurred.',
      };
      console.log('Error:', action.error);
    })

    .addCase(handleError, (state, action) => {
      state.alert = {
        type: 'warning',
        message: action.payload ?? 'Unknown error occurred.',
      };
    })
    .addCase(clearAlert, (state) => {
      state.alert = null;
    });
});

export default userReducer;
