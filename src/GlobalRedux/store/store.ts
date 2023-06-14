import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import countryReducer from './reducers/country';
import worldReducer from './reducers/world';
import homeReducer from './reducers/home';
import userReducer from './reducers/user';
import errorReducer from './reducers/error';

const store = configureStore({
  reducer: {
    world: worldReducer,
    country: countryReducer,
    home: homeReducer,
    user: userReducer,
    error: errorReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

if (typeof sessionStorage !== 'undefined') {
  const url = window.location.host;
  if (!url.includes('localhost')) {
    sessionStorage.clear();
  }
  const username = sessionStorage.getItem('username');
  const sessionId = sessionStorage.getItem('sessionId');

  if (sessionId && username) {
    store.dispatch({
      type: 'user/login/fulfilled',
      payload: {
        data: {
          session: {
            id: parseInt(sessionId),
            username,
          },
        },
      },
    });
  }
}

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
