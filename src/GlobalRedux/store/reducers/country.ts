import { CountriesProps } from '../../../@types/index';
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CountryState {
  countries: CountriesProps[];
}

const initialState: CountryState = {
  countries: [],
};

const countryReducer = createReducer(initialState, (builder) => {
  builder;
});

export default countryReducer;
