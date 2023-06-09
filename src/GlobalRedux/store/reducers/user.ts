import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

interface UserState {
  isLoading: boolean;
  isLogged: boolean;
  username: string | null;
  message: string;
  id: number | null;
}

const initialState: UserState = {
  isLoading: false,
  isLogged: false,
  username: null,
  message: '',
  id: null,
};

// Actions asynchrones
export const login = createAsyncThunk(
  'user/login',
  async (formInput: FormData) => {
    const obj = Object.fromEntries(formInput);
    const { data } = await axiosInstance.post('/api/log/in', obj);
    console.log('data :', data);
    return data;
  }
);

// Actions synchrones
export const logout = createAction('user/logout');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogged = true;
      state.username = action.payload.user.username;
      state.id = action.payload.user.id;
      state.message = action.payload.message;
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isLogged = false;
    })
    .addCase(logout, (state) => {
      state.isLogged = false;
      state.username = null;
    });
});

export default userReducer;
