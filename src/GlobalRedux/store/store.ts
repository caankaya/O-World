import { configureStore } from '@reduxjs/toolkit';

import countryReducer from './reducers/country';

const store = configureStore({
  reducer: {
    country: countryReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
