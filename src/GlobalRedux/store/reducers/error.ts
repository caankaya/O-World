import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  message: string | null;
  statusCode: number | null;
}

const initialState: ErrorState = {
  message: null,
  statusCode: null,
};

export const setError = createAction<{ message: string; statusCode: number }>(
  'error/setError'
);

export const clearError = createAction('error/clearError');

const errorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setError, (state, action) => {
      state.message = action.payload.message;
      state.statusCode = action.payload.statusCode;
    })
    .addCase(clearError, (state) => {
      state.message = null;
      state.statusCode = null;
    });
});

export default errorReducer;
