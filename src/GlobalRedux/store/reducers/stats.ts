import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { AlertType } from '../../../@types/alert';
import { Stats } from '../../../@types/statsAdmin';

interface StatsState {
  stats: Stats[];
  loading: boolean;
  infiniteLoading: boolean;
  alert: AlertType | null;
}

const initialState: StatsState = {
  stats: [],
  loading: false,
  infiniteLoading: false,
  alert: null,
};

export const clearStatsAlert = createAction('stats/clearAlert');

export const fetchAdminStatsData = createAsyncThunk(
  'stats/fetchAdminStatsData',
  async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/${localStorage.id}/stat`,
        {
          params: { useView: true },
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

const statsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAdminStatsData.pending, (state) => {
      state.loading = true;
      state.infiniteLoading = true;
      state.alert = null;
    })
    .addCase(fetchAdminStatsData.fulfilled, (state, action) => {
      state.loading = false;
      state.infiniteLoading = false;
      state.stats = action.payload;
    })
    .addCase(fetchAdminStatsData.rejected, (state, action) => {
      state.loading = false;
      state.infiniteLoading = true;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    })

    .addCase(clearStatsAlert, (state) => {
      state.alert = null;
    });
});

export default statsReducer;
