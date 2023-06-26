import { Middleware, Dispatch } from 'redux';
import { refreshAccessToken } from '../store/reducers/user';
import { ThunkAction } from 'redux-thunk';

const jwtExpiredMiddleware: Middleware = (store) => (next) => (action) => {
  const dispatch: Dispatch<any> = store.dispatch;

  if (action.error && action.error.message === 'jwt expired') {
    dispatch(refreshAccessToken() as ThunkAction<void, any, any, any>);
  }

  return next(action);
};

export default jwtExpiredMiddleware;
