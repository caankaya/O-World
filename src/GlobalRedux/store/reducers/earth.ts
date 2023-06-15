import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from '@/@types/alert';
import axiosInstance from '@/utils/axios';

interface EarthState {
  data: PlanetsData;
  loading: boolean;
  alert: Alert | null;
}

const initialState: EarthState = {
  data: {},
  loading: false,
  alert: null,
};

export const fetchEarthData = createAsyncThunk<PlanetsData, { url: string; params: Record<string, any> }>(
  'earth/fetchEarthData',
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

const earthReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchEarthData.pending, (state) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(fetchEarthData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchEarthData.rejected, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    });
});

export default earthReducer;
