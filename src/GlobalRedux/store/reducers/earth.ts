import { createReducer, createAsyncThunk, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { setError } from '@/GlobalRedux/store/reducers/error';
import axiosInstance from '@/utils/axios';

interface EarthState {
  data: PlanetsData;
  loading: boolean;
}

const initialState: EarthState = {
  data: {},
  loading: false,
};

export const fetchEarthData = createAsyncThunk<PlanetsData, { url: string; params: Record<string, any> }, { dispatch: ThunkDispatch<{}, {}, AnyAction> }>(
  'earth/fetchEarthData',
  async ({ url, params }, { dispatch }) => {
    try {
      const response = await axiosInstance.get(url, {
        params,
        headers: { accept: 'application/json' },
      });
      return response.data;
    } catch (error: any) {
      console.log('error :', error);
      dispatch(setError({ 
        code: error.code, 
        statusCode: error.response?.status || 500,
        message: error.message || 'Une erreur inattendue est survenue.' // Ajoutez le message ici
      }));
      throw error; // Important to throw error, so that the thunk is rejected
    }
  }
);

const earthReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchEarthData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchEarthData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchEarthData.rejected, (state) => {
      state.loading = false;
    });
});

export default earthReducer;
