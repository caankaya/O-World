import { configureStore } from '@reduxjs/toolkit';

import countryReducer from './reducers/country';
import worldReducer from './reducers/world';
import homeReducer from './reducers/home';

const store = configureStore({
  reducer: {
    world: worldReducer,
    country: countryReducer,
    home: homeReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
