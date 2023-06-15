import { createReducer, createAction } from '@reduxjs/toolkit';

interface ErrorState {
  code: string | null;
  statusCode: number | null;
  message: string | null;
}

const initialState: ErrorState = {
  code: null,
  statusCode: null,
  message: null,
};

export const setError = createAction<{ code: string; statusCode: number; message: string }>(
  'error/setError'
);

export const clearError = createAction('error/clearError');

const errorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setError, (state, action) => {
      state.code = action.payload.code;
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
    })
    .addCase(clearError, (state) => {
      state.code = null;
      state.statusCode = null;
      state.message = null;
    });
});

export default errorReducer;
