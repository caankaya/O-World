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
  sessionId: null;
}
const initialState: UserState = {
  isLoading: false,
  isLogged: false,
  username: null,
  message: '',
  id: null,
  sessionId: null,
};

// Actions asynchrones
export const login = createAsyncThunk(
  'user/login',
  async (formInput: FormData) => {
    const obj = Object.fromEntries(formInput);
    const { data } = await axiosInstance.post('/api/log/in', obj);
    return data;
  }
);

// Action
export const logout = createAction('user/logout');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogged = true;
      state.id = action.payload.user.id;
      state.message = action.payload.message;
      const { id, username } = action.payload.data.session;
      state.isLogged = true;
      state.sessionId = id;
      state.username = username;
      sessionStorage.setItem('sessionId', id.toString());
      sessionStorage.setItem('username', username);
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isLogged = false;
    })
    .addCase(logout, (state) => {
      state.isLogged = false;
      state.username = null;
      state.isLogged = false;
      state.id = null;
    });
});

export default userReducer;
