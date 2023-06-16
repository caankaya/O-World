import { configureStore } from '@reduxjs/toolkit';

import countryReducer from './reducers/country';
import statsReducer from './reducers/stats';
import homeReducer from './reducers/home';
import userReducer from './reducers/user';
import earthReducer from './reducers/earth';
import graphReducer from './reducers/graph';
import infosReducer from './reducers/infos';

const store = configureStore({
  reducer: {
    earth: earthReducer,
    stats: statsReducer,
    country: countryReducer,
    home: homeReducer,
    user: userReducer,
    graph: graphReducer,
    infos: infosReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
