import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import {
  Country,
  CountryCategories,
  Economy,
  Education,
  Environnement,
  Job,
  Population,
  Values,
} from '../../../@types/countryCategories';
import axiosInstance from '../../../utils/axios';
import { AlertType } from '../../../@types/alert';

interface CountryState {
  category: CountryCategories;
  loading: boolean;
  infiniteLoading: boolean;
  alert: AlertType | null;
}

const initialState: CountryState = {
  category: {
    country: {} as Country,
    population: [] as Population[],
    environnement: [] as Environnement[],
    education: [] as Education[],
    job: [] as Job[],
    economy: [] as Economy[],
    value: [] as Values[],
  },
  loading: false,
  infiniteLoading: false,
  alert: null,
};

export const clearGraphAlert = createAction('planet/clearAlert');

export const fetchGraph = createAsyncThunk(
  'country/fetchGraph',
  async (countryId: string) => {
    try {
      const response = await axiosInstance.get(`/oworld/${countryId}/category`);
      return response;
    } catch (error) {
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
