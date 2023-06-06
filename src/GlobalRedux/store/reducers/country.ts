import { CountryCategories } from '@/@types/countryCategories';
import { CountriesDataProps } from '../../../@types/countryData';
import { createReducer, createAction } from '@reduxjs/toolkit';

interface CountryState {
  category: CountryCategories[];
  data: CountriesDataProps | null;
}

const initialState: CountryState = {
  category: [],
  data: null,
};
export const setCountryCategory = createAction<CountryCategories[]>(
  'country/categoryData'
);
export const setCountryData = createAction<CountriesDataProps>(
  'country/countryData'
);

const countryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCountryCategory, (state, action) => {
      state.category = action.payload;
    })
    .addCase(setCountryData, (state, action) => {
      state.data = action.payload;
    });
});

export default countryReducer;
