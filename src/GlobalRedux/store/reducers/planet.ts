import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from '@/@types/alert';
import axiosInstance from '@/utils/axios';
import { Earth } from '@/@types/planetDatas';

interface PlanetState {
  earthData: Earth;
  loading: boolean;
  alert: Alert | null;
}

const initialState: PlanetState = {
  earthData: {} as Earth,
  loading: false,
  alert: null,
};

export const fetchEarthData = createAsyncThunk(
  'earth/fetchEarthData',
  async () => {
    try {
      const response = await axiosInstance.get('/oworld');
      return response.data.Earth;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

const planetReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchEarthData.pending, (state) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(fetchEarthData.fulfilled, (state, action) => {
      state.loading = false;
      state.earthData = action.payload;
    })
    .addCase(fetchEarthData.rejected, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    });
});

export default planetReducer;
