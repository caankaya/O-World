import { CountriesProps } from '../../../@types/index';
import { createReducer, createAction } from '@reduxjs/toolkit';

interface CountryState {
  data: CountriesProps[];
}

const initialState: CountryState = {
  data: [],
};

export const setCountryData = createAction<CountriesProps[]>('country/Data');

const countryReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCountryData, (state, action) => {
    state.data = action.payload;
  });
});

export default countryReducer;
