import { CountriesProps } from '../../../@types/index';
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

interface CountryState {
  countries: CountriesProps[];
}

const initialState: CountryState = {
  countries: [],
};

export const setCountryData = createAction<CountriesProps[]>('country/Data');

const countryReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCountryData, (state, action) => {
    state.countries = action.payload;
  });
});

export default countryReducer;
