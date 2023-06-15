import { CountryCategories } from '@/@types/countryCategories';
import { CountriesDataProps } from '../../../@types/countryData';
import { AnyAction, ThunkDispatch, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { setError } from './error';
import axiosInstance from '@/utils/axios';

interface CountryState {
  category: CountryCategories[];
  data: CountriesDataProps | null;
  loading: boolean;
}

const initialState: CountryState = {
  category: [],
  data: null,
  loading: false,
};

export const fetchCountryData = createAsyncThunk<any, { id: string }, { dispatch: ThunkDispatch<{}, {}, AnyAction> }>(
  'country/fetchCountryData',
  async ({ id }, { dispatch }) => {
    try {
      const categoryUrl = `/oworld/${id}/category`;
      const dataUrl = `/oworld/${id}`;

      const categoryResponse = await axiosInstance.get(categoryUrl);
      const dataResponse = await axiosInstance.get(dataUrl);

      const categoryData = categoryResponse.data;
      const countryData = dataResponse.data;

      return { categoryData, countryData };

    } catch (error: any) {
      console.log('Error:', error);
      dispatch(setError({ 
        code: error.code, 
        statusCode: error.response?.status || 500,
        message: error.message || 'Une erreur inattendue est survenue.'
      }));
      throw error;
    }
  }
);

const countryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCountryData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCountryData.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload.categoryData;
      state.data = action.payload.countryData;
    })
    .addCase(fetchCountryData.rejected, (state) => {
      state.loading = false;
    });
});

export default countryReducer;
