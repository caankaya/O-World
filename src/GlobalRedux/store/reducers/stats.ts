import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import { Stats } from '@/@types/statsAdmin';
import axiosInstance from '@/utils/axios';
import { Alert } from '@/@types/alert';

interface StatsState {
  stats: Stats[];
  loading: boolean;
  infiniteLoading: Boolean;
  alert: Alert | null;
}

const initialState: StatsState = {
  stats: [],
  loading: false,
  infiniteLoading: false,
  alert: null,
};

//Synchronous actions
export const clearStatsAlert = createAction('stats/clearAlert');

//Asynchronous actions
export const fetchAdminStatsData = createAsyncThunk(
  'stats/fetchAdminStatsData',
  async (_, { getState }) => {
    try {
      const response = await axiosInstance.get('/stats/fetch-stat', {
        params: { useView: true },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

const statsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAdminStatsData.pending, (state) => {
      state.loading = true;
      state.infiniteLoading = true;
      state.alert = null;
    })
    .addCase(fetchAdminStatsData.fulfilled, (state, action) => {
      state.loading = false;
      state.infiniteLoading = false;
      state.stats = action.payload;
    })
    .addCase(fetchAdminStatsData.rejected, (state, action) => {
      state.loading = false;
      state.infiniteLoading = true;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    })

    .addCase(clearStatsAlert, (state) => {
      state.alert = null;
    });
});

export default statsReducer;
