import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { Alert } from '@/@types/alert';
import { RootState } from '../store';
import querystring from 'querystring';
import { URLSearchParams } from 'url';

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

//Asynchronous actions
export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    const obj = Object.fromEntries(formData);
    console.log('obj :', obj);
    try {
      const response = await axiosInstance.post('/log/in', obj, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('response:', response);
      return response;
    } catch (error) {
      console.log('error:', error);
      throw error;
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (formInput: FormData) => {
    const obj = Object.fromEntries(formInput);
    try {
      const response = await axiosInstance.post('/user', obj);
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const accountUpdate = createAsyncThunk(
  'user/account-update',
  async (formInput: FormData, { getState }) => {
    const obj = Object.fromEntries(formInput);
    try {
      const { sessionId } = (getState() as RootState).user; // Utilisation de RootState pour annoter le type
      const response = await axiosInstance.put(`/user/${sessionId}`, obj);
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const accountDeletion = createAsyncThunk(
  'user/account-deletion',
  async (_, { getState }) => {
    try {
      const { sessionId } = (getState() as RootState).user; // Utilisation de RootState pour annoter le type
      const response = await axiosInstance.delete(`/user/${sessionId}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

//Synchronous actions
export const logout = createAction('user/logout');
export const clearAlert = createAction('user/clearAlert');
export const handleError = createAction<string>('user/handleError');
export const messageUp = createAction<boolean>('message/popUp');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state, action) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      console.log('action :', action);

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
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
      console.log('Error:', action);
    })

    .addCase(accountUpdate.pending, (state, action) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(accountUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'success',
        message: `Your account has been updated.`,
      };
    })
    .addCase(accountUpdate.rejected, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'error',
        message: action.error.message ?? 'Unknown error occurred.',
      };
      console.log('Error:', action.error);
    })

    .addCase(accountDeletion.pending, (state, action) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(accountDeletion.fulfilled, (state, action) => {
      state.loading = false;
      state.isLogged = false;
      state.sessionId = null;
      state.username = null;
      sessionStorage.clear();
      state.alert = {
        type: 'success',
        message: `Your account has been deleted.`,
      };
    })
    .addCase(accountDeletion.rejected, (state, action) => {
      state.loading = false;
      state.alert = {
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
