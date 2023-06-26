import { refreshAccessToken } from '../store/reducers/user';

const jwtExpiredMiddleware = (store) => (next) => (action) => {
  if (action.error && action.error.message === 'jwt expired') {
    store.dispatch(refreshAccessToken());
  }

  return next(action);
};

export default jwtExpiredMiddleware;
