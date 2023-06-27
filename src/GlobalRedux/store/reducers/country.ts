import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { CountriesDataProps } from '../../../@types/countryData';
import axiosInstance from '../../../utils/axios';

import { AlertType } from '../../../@types/alert';

/**
 * Interface representing the state of the country.
 */
interface CountryState {
  data: CountriesDataProps | null;
  loading: boolean;
  infiniteLoading: boolean;
  alert: AlertType | null;
}

/**
 * Initial state of the country.
 */
const initialState: CountryState = {
  data: null,
  loading: false,
  infiniteLoading: false,
  alert: null,
};

/**
 * Action to clear the country alert.
 */
export const clearCountryAlert = createAction('stats/clearAlert');

/**
 * Asynchronous action to retrieve country data.
 */
export const fetchRestCountries = createAsyncThunk(
  'country/fetchRestCountries',
  async (countryId: string) => {
    try {
      const response = await axiosInstance.get(`/oworld/${countryId}`);
      return response;
    } catch (error: string | any) {
      throw new Error(error.response.data.message as string);
    }
  }
);

/**
 * Action to reset country data.
 */
export const resetCountryData = createAction('country/reset-data');

/**
 * Country reducer.
 */
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

    .addCase(resetCountryData, (state) => {
      state.data = null;
    })

    .addCase(clearCountryAlert, (state) => {
      state.alert = null;
    });
});

export default countryReducer;
