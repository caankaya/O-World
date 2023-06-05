import { CountriesProps } from '../../../@types/index';
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CountryState {
  countries: CountriesProps[];
}

const initialState: CountryState = {
  countries: [],
};

export const fetchCountries = createAsyncThunk(
  ' fetchCountries', // nom de l'action
  async () => {
    const response = await axios.get('http://localhost:3001/');
    return response.data;
  }
);

const countryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCountries.pending, (state, action) => {
      console.log('state :', state);
      console.log('action :', action);
    })
    .addCase(fetchCountries.fulfilled, (state, action) => {
      console.log('state :', state);
      console.log('action :', action);
    })
    .addCase(fetchCountries.rejected, (state, action) => {
      console.log('state :', state);
      console.log('action :', action);
    });
});

export default countryReducer;
