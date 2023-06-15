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


export const fetchRestCountries = createAsyncThunk<any, { id: string }>(
  'country/fetchRestCountries',
  async ({ id }) => {
    try {
      const response = await axiosInstance.get(`/oworld/${id}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);



const countryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchRestCountries.pending, (state) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(fetchRestCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    })
    .addCase(fetchRestCountries.rejected, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    })
});

export default countryReducer;
