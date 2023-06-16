import { createAsyncThunk, createReducer, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axios';
import { Alert } from '@/@types/alert';

interface Celebrity {
  name: string;
  net_worth: number;
  gender: string;
  nationality: string;
  occupation: string[];
  birthday: string;
  age: number;
  is_alive: boolean;
}

// Définir l'interface pour les données de l'API
interface Infos {
  name: string;
  url: string;
  url_resolved: string;
  homepage: string;
}

interface ApiResponse {
  radio: Infos;
  insolite: string;
  celebrity: Celebrity[];
}

// Définir l'interface pour l'état
interface InfosState {
  radio: Infos | null;
  insolite: string | null;
  celebrity: Array<any> | null;
  loading: boolean;
  alert: Alert | null;
}

// Définir l'état initial
const initialState: InfosState = {
  loading: false,
  alert: null,
  radio: null,
  insolite: null,
  celebrity: null,
};

// Utiliser ces types dans createAsyncThunk
export const fetchRadio = createAsyncThunk<ApiResponse, { id: string }>(
  'country/fetchRadio',
  async ({ id }) => {
    try {
      const response = await axiosInstance.get<ApiResponse>(`/oworld/${id}/wtf`);
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
      state.alert = null;
    })
    .addCase(fetchRadio.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
      state.loading = false;
      state.radio = action.payload.radio;
      state.insolite = action.payload.insolite;
      state.celebrity = action.payload.celebrity;
    })
    .addCase(fetchRadio.rejected, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    });
});

export default infosReducer;
