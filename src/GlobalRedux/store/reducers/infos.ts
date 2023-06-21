import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { Alert } from '../../../@types/alert';
import { ApiResponse, Celebrity, Radio } from '../../../@types/infos';

// Définir l'interface pour l'état
interface InfosState {
  radio: Radio;
  insolite: string;
  celebrity: Celebrity[];
  loading: boolean;
  infiniteLoading: boolean;
  alert: Alert | null;
}

// Définir l'état initial
const initialState: InfosState = {
  loading: false,
  infiniteLoading: false,
  alert: null,
  radio: {} as Radio,
  insolite: '',
  celebrity: [],
};

export const clearInfosAlert = createAction('infos/clearAlert');

export const fetchRadio = createAsyncThunk<ApiResponse, { id: string }>(
  'country/fetchRadio',
  async ({ id }) => {
    try {
      const response = await axiosInstance.get(`/oworld/${id}/wtf`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }
);

// Modifier le reducer pour manipuler les données de la réponse
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
