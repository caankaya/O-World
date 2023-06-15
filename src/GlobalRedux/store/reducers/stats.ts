import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { DataRow } from '@/@types/statsAdmin';
import axiosInstance from '@/utils/axios';
import { Alert } from '@/@types/alert';

interface StatsState {
  data: DataRow[];
  flags: DataRow[];
  loading: boolean;
  alert: Alert | null;
}

const initialState: StatsState = {
  data: [],
  flags: [],
  loading: false,
  alert: null,
};

export const fetchStatsData = createAsyncThunk<DataRow[], { url: string; params: Record<string, any> }>(
  'stats/fetchData',
  async ({ url, params }) => {
    try {
      const response = await axiosInstance.get(url, {
        params,
        headers: { accept: 'application/json' },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

const statsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchStatsData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchStatsData.fulfilled, (state, action) => {
      state.loading = false;
      if (action.meta.arg.url === '/admin/stat') {
        state.data = action.payload;
      } else if (action.meta.arg.url === '/oworld/flags') {
        state.flags = action.payload;
      }
    })
    .addCase(fetchStatsData.rejected, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    });
});

export default statsReducer;
