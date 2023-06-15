import { CountryCategories } from '@/@types/countryCategories';
import { CountriesDataProps } from '../../../@types/countryData';
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axios';
import { Alert } from '@/@types/alert';

interface CountryState {
  category: CountryCategories[];
  data: CountriesDataProps | null;
  loading: boolean;
  alert: Alert | null;
}

const initialState: CountryState = {
  category: [],
  data: null,
  loading: false,
  alert: null,
};

export const fetchGraph = createAsyncThunk<any, { id: string }>(
    'country/fetchGraph',
    async ({ id }) => {
      try {
        const response = await axiosInstance.get(`/oworld/${id}/category`);
        return response;
      } catch (error: any) { 
        throw new Error(error.response.data.message);
      }
    }
  );

const graphReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(fetchGraph.pending, (state) => {
        state.loading = true;
        state.alert = null;
      })
      .addCase(fetchGraph.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.data;
      })
      .addCase(fetchGraph.rejected, (state, action) => {
        state.loading = false;
        state.alert = {
          type: 'error',
          message: action.error.message || 'Unknown error occurred.',
        };
      });
  });
  
  export default graphReducer;