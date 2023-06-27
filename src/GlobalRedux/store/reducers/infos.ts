import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { AlertType } from '../../../@types/alert';
import { ApiResponse, Celebrity, Radio } from '../../../@types/infos';

// Define the interface for the state
interface InfosState {
  radio: Radio;
  insolite: string;
  celebrity: Celebrity[];
  loading: boolean;
  infiniteLoading: boolean;
  alert: AlertType | null;
}

// Define the initial state
const initialState: InfosState = {
  loading: false,
  infiniteLoading: false,
  alert: null,
  radio: {} as Radio,
  insolite: '',
  celebrity: [],
};

/**
 * Action to clear the infos alert.
 */
export const clearInfosAlert = createAction('infos/clearAlert');

/**
 * Async thunk to fetch radio data.
 */
export const fetchRadio = createAsyncThunk(
  'country/fetchRadio',
  async (countryId: string) => {
    try {
      const response = await axiosInstance.get(`/oworld/${countryId}/wtf`);
      return response.data;
    } catch (error: string | any) {
      throw new Error(error.response.data.message as string);
    }
  }
);

/**
 * Reducer for the infos state.
 */
const infosReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchRadio.pending, (state) => {
      state.loading = true;
      state.infiniteLoading = true;
      state.alert = null;
    })
    .addCase(fetchRadio.fulfilled, (state, action) => {
      state.loading = false;
      state.infiniteLoading = false;
      state.radio = action.payload.radio;
      state.insolite = action.payload.insolite;
      state.celebrity = action.payload.celebrity;
    })
    .addCase(fetchRadio.rejected, (state, action) => {
      state.loading = false;
      state.infiniteLoading = true;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    })
    .addCase(clearInfosAlert, (state) => {
      state.alert = null;
    });
});

export default infosReducer;
