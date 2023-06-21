import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { Alert } from '../../../@types/alert';
import { Flags } from '../../../@types/flags';

interface FlagsState {
  flags: Flags[];
  loading: boolean;
  alert: Alert | null;
}

const initialState: FlagsState = {
  flags: [],
  loading: false,
  alert: null,
};

export const clearFlagsAlert = createAction('stats/clearAlert');

export const fetchFlagsData = createAsyncThunk(
  'stats/fetchFlagsData',
  async () => {
    try {
      const response = await axiosInstance.get('/oworld/flags');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

const flagsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchFlagsData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchFlagsData.fulfilled, (state, action) => {
      state.loading = false;
      state.flags = action.payload;
    })
    .addCase(fetchFlagsData.rejected, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    })

    .addCase(clearFlagsAlert, (state) => {
      state.alert = null;
    });
});

export default flagsReducer;
