import { CountryCategories } from '@/@types/countryCategories';

import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axiosInstance from '@/utils/axios';
import { Alert } from '@/@types/alert';

interface CountryState {
  category: CountryCategories[];
  loading: boolean;
  infiniteLoading: Boolean;
  alert: Alert | null;
}

const initialState: CountryState = {
  category: [],
  loading: false,
  infiniteLoading: false,
  alert: null,
};

//Synchronous actions
export const clearGraphAlert = createAction('planet/clearAlert');

//Asynchronous actions
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
      state.infiniteLoading = true;
      state.alert = null;
    })
    .addCase(fetchGraph.fulfilled, (state, action) => {
      state.loading = false;
      state.infiniteLoading = false;
      state.category = action.payload.data;
    })
    .addCase(fetchGraph.rejected, (state, action) => {
      state.loading = false;
      state.infiniteLoading = true;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    })

    .addCase(clearGraphAlert, (state) => {
      state.alert = null;
    });
});

export default graphReducer;
