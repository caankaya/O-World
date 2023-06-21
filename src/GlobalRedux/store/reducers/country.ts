import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { CountriesDataProps } from '../../../@types/countryData';
import axiosInstance from '../../../utils/axios';
import { AlertType } from '../../../@types/alert';

interface CountryState {
  data: CountriesDataProps | null;
  loading: boolean;
  infiniteLoading: boolean;
  alert: AlertType | null;
}

const initialState: CountryState = {
  data: null,
  loading: false,
  infiniteLoading: false,
  alert: null,
};

export const clearCountryAlert = createAction('stats/clearAlert');

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
      state.infiniteLoading = true;
      state.alert = null;
    })
    .addCase(fetchRestCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.infiniteLoading = false;
      state.data = action.payload.data;
    })
    .addCase(fetchRestCountries.rejected, (state, action) => {
      state.loading = false;
      state.infiniteLoading = true;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    })

    .addCase(clearCountryAlert, (state) => {
      state.alert = null;
    });
});

export default countryReducer;
