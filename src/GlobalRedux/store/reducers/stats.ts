import { createReducer, createAsyncThunk, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { setError } from '@/GlobalRedux/store/reducers/error';
import { DataRow } from '@/@types/statsAdmin';
import axiosInstance from '@/utils/axios';

interface StatsState {
  data: DataRow[];
  flags: DataRow[];
  loading: boolean;
}

const initialState: StatsState = {
  data: [],
  flags: [],
  loading: false,
};

export const fetchStatsData = createAsyncThunk<DataRow[], { url: string; params: Record<string, any> }, { dispatch: ThunkDispatch<{}, {}, AnyAction> }>(
  'stats/fetchData',
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

const statsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchStatsData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchStatsData.fulfilled, (state, action) => {
      state.loading = false;
      if (action.meta.arg.url === '/admin/stat') {
        state.data = action.payload;
      } else if (action.meta.arg.url === '/oworld/flags') {
        state.flags = action.payload;
      }
    })
    .addCase(fetchStatsData.rejected, (state) => {
      state.loading = false;
    });
});

export default statsReducer;
