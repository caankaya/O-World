import { configureStore } from '@reduxjs/toolkit';

import countryReducer from './reducers/country';

import homeReducer from './reducers/home';
import userReducer from './reducers/user';
import planetReducer from './reducers/planet';
import graphReducer from './reducers/graph';
import flagsReducer from './reducers/flags';
import infosReducer from './reducers/infos';

const store = configureStore({
  reducer: {
    planet: planetReducer,
    country: countryReducer,
    home: homeReducer,
    user: userReducer,
    graph: graphReducer,
    flags: flagsReducer,
    infos: infosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Désactive la vérification de sérialisation par défaut
    }),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
