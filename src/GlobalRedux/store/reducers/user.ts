import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import axiosInstance from '../../../utils/axios';
import { AlertType } from '../../../@types/alert';
import { CountryFavorites } from '../../../@types/countryFavorites';
import { Stats } from '../../../@types/statsAdmin';
import { IToken } from '../../../@types/accessToken';

interface UserState {
  username: string | null;
  roles: string[];
  isLogged: boolean;
  loading: boolean;
  alert: AlertType | null;
  token: string | null;
  userIp: string;
  sessionId: number | null;
  rememberMe: boolean;
  infiniteLoading: boolean;
  favoritesCountries: CountryFavorites[];
  stats: Stats[];
}

const initialState: UserState = {
  username:
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('username') || null
      : null,
  roles:
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('roles') !== null
      ? localStorage.getItem('roles')!.split(',')
      : [],
  isLogged:
    typeof localStorage !== 'undefined' &&
    !!localStorage.getItem('accessToken'),
  token:
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null,
  loading: false,
  infiniteLoading: false,
  alert: null,
  userIp: '',
  sessionId: null,
  rememberMe: false,
  favoritesCountries: [],
  stats: [],
};

export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    const obj = Object.fromEntries(formData);
    try {
      const response = await axiosInstance.post('/log/in', obj);
      return response.data.data;
    } catch (error: string | any) {
      throw new Error(error.response.data.message as string);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (formInput: FormData) => {
    const obj = Object.fromEntries(formInput);
    try {
      const response = await axiosInstance.post('/user', obj);
      return response;
    } catch (error: string | any) {
      throw new Error(error.response.data.message as string);
    }
  }
);

export const accountUpdate = createAsyncThunk(
  'user/account-update',
  async (formInput: FormData) => {
    const obj = Object.fromEntries(formInput);
    try {
      const response = await axiosInstance.put(`/user/${localStorage.id}`, obj);

      return response.data;
    } catch (error: string | any) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message as string);
      } else {
        throw new Error(error.response.data.error as string);
      }
    }
  }
);

export const accountDeletion = createAsyncThunk(
  'user/account-deletion',
  async (formInput: FormData) => {
    const obj = Object.fromEntries(formInput);

    try {
      const response = await axiosInstance.delete(`/user/${localStorage.id}`, {
        data: obj,
      });
      return response;
    } catch (error: string | any) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message as string);
      } else {
        throw new Error(error.response.data.error as string);
      }
    }
  }
);

export const fetchFavoritesCountries = createAsyncThunk(
  'user/favorites-countries',
  async () => {
    try {
      const response = await axiosInstance.get(`/user/${localStorage.id}`);
      if (
        response.data[0].favorite_countries.length > 0 &&
        response.data[0].favorite_countries.some((country: (string | null)[]) =>
          country.some((value) => value !== null)
        )
      ) {
        const transformedData = response.data[0].favorite_countries.map(
          (country: [string, string, string]) => {
            const [name, cca3, dateTime] = country;
            const [date, time] = dateTime?.split(' ') ?? ['', ''];

            return {
              name,
              cca3,
              date,
              time,
            };
          }
        );
        return transformedData;
      }
    } catch (error: string | any) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message as string);
      } else {
        throw new Error(error.response.data.error as string);
      }
    }
  }
);

export const addFavoriteCountry = createAsyncThunk<any, { countryId: string }>(
  'user/add-favorite-country',
  async ({ countryId }) => {
    try {
      const response = await axiosInstance.post(
        `/user/${localStorage.id}/${countryId}`,
        {} // Passer un objet vide en tant que corps de la requête
      );
      return response.data;
    } catch (error: string | any) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message as string);
      } else {
        throw new Error(error.response.data.error as string);
      }
    }
  }
);

export const removeFavoriteCountry = createAsyncThunk<
  any,
  { countryId: string }
>('user/remove-favorite-country', async ({ countryId }) => {
  try {
    const response = await axiosInstance.delete(
      `/user/${localStorage.id}/${countryId}`
    );
    return response.data;
  } catch (error: string | any) {
    if (error.response.data.message) {
      throw new Error(error.response.data.message as string);
    } else {
      throw new Error(error.response.data.error as string);
    }
  }
});

export const fetchAdminStatsData = createAsyncThunk(
  'stats/fetchAdminStatsData',
  async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/${localStorage.id}/stat`,
        {
          params: { useView: true },
        }
      );
      return response.data;
    } catch (error: string | any) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message as string);
      } else {
        throw new Error(error.response.data.error as string);
      }
    }
  }
);

export const logout = createAction('user/logout');
export const clearUserAlert = createAction('user/clearAlert');
export const handleError = createAction<string>('user/handleError');
export const setRememberMe = createAction<boolean>('user/setRememberMe');

function logoutAction(state: UserState) {
  state.loading = false;
  state.isLogged = false;
  state.sessionId = null;
  state.username = null;
  state.roles = [];
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('id');
  localStorage.removeItem('username');
  localStorage.removeItem('roles');
}

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.alert = null;
      state.isLogged = false;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isLogged = true;
      const accessToken: IToken = jwt_decode(action.payload.accessToken);
      const { id, username, roles } = accessToken.data;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('id', id);
      localStorage.setItem('username', username);
      localStorage.setItem('roles', roles as string);
      state.username = username;
      state.roles = roles as string[];
      state.alert = {
        type: 'success',
        message: `Welcome ${username}`,
      };
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isLogged = false;
      state.username = null;
      state.alert = {
        type: 'error',
        message: action.error.message ?? 'Unknown error occurred.',
      };
    })

    .addCase(logout, (state) => {
      logoutAction(state);
      state.alert = {
        type: 'success',
        message: 'You are disconnected',
      };
    })

    .addCase(register.pending, (state) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(register.fulfilled, (state) => {
      state.loading = false;
      state.alert = {
        type: 'success',
        message: `Your account has been created and you can now log in.`,
      };
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'error',
        message: action.error.message || 'Unknown error occurred.',
      };
    })

    .addCase(accountUpdate.pending, (state) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(accountUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.isLogged = true;
      const accessToken: IToken = jwt_decode(action.payload.tokens.accessToken);
      const { id, username, roles } = accessToken.data;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('id');
      localStorage.removeItem('username');
      localStorage.removeItem('roles');
      localStorage.setItem('accessToken', action.payload.tokens.accessToken);
      localStorage.setItem('refreshToken', action.payload.tokens.refreshToken);
      localStorage.setItem('id', id);
      localStorage.setItem('username', username);
      localStorage.setItem('roles', roles as string);
      state.username = username;
      state.roles = roles as string[];
      state.alert = {
        type: 'success',
        message: `Good news ${username}! Your account has been updated.`,
      };
    })
    .addCase(accountUpdate.rejected, (state, action) => {
      state.loading = false;
      if (
        action.error.message === 'token invalid' ||
        'No refresh token found'
      ) {
        logoutAction(state);
        state.alert = {
          type: 'error',
          message: 'Session expired. Please log in again.',
        };
      } else {
        state.alert = {
          type: 'error',
          message: action.error.message ?? 'Unknown error occurred.',
        };
      }
    })

    .addCase(accountDeletion.pending, (state) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(accountDeletion.fulfilled, (state) => {
      state.loading = false;
      state.isLogged = false;
      state.sessionId = null;
      state.username = null;
      state.roles = [];
      localStorage.clear();
      state.alert = {
        type: 'success',
        message: `Your account has been deleted.`,
      };
    })
    .addCase(accountDeletion.rejected, (state, action) => {
      state.loading = false;
      if (
        action.error.message === 'token invalid' ||
        'No refresh token found'
      ) {
        logoutAction(state);
        state.alert = {
          type: 'error',
          message: 'Session expired. Please log in again.',
        };
      } else {
        state.alert = {
          type: 'error',
          message: action.error.message ?? 'Unknown error occurred.',
        };
      }
    })

    .addCase(fetchFavoritesCountries.pending, (state) => {
      state.loading = true;
      state.infiniteLoading = true;
      state.alert = null;
    })
    .addCase(fetchFavoritesCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.infiniteLoading = false;
      state.favoritesCountries = action.payload;
    })
    .addCase(fetchFavoritesCountries.rejected, (state, action) => {
      state.loading = false;
      state.infiniteLoading = true;
      if (
        action.error.message === 'token invalid' ||
        'No refresh token found'
      ) {
        logoutAction(state);
        state.alert = {
          type: 'error',
          message: 'Session expired. Please log in again.',
        };
      } else {
        state.alert = {
          type: 'error',
          message: action.error.message ?? 'Unknown error occurred.',
        };
      }
    })

    .addCase(addFavoriteCountry.pending, (state) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(addFavoriteCountry.fulfilled, (state) => {
      state.loading = false;
      state.alert = {
        type: 'success',
        message: `Country added to favorites.`,
      };
    })
    .addCase(addFavoriteCountry.rejected, (state, action) => {
      state.loading = false;

      if (
        action.error.message === 'token invalid' ||
        'No refresh token found'
      ) {
        logoutAction(state);
        state.alert = {
          type: 'error',
          message: 'Session expired. Please log in again.',
        };
      } else {
        state.alert = {
          type: 'error',
          message: action.error.message ?? 'Unknown error occurred.',
        };
      }
    })

    .addCase(removeFavoriteCountry.pending, (state) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(removeFavoriteCountry.fulfilled, (state) => {
      state.loading = false;
      state.alert = {
        type: 'success',
        message: `Country deleted to favorites.`,
      };
    })
    .addCase(removeFavoriteCountry.rejected, (state, action) => {
      state.loading = false;
      if (
        action.error.message === 'token invalid' ||
        'No refresh token found'
      ) {
        logoutAction(state);
        state.alert = {
          type: 'error',
          message: 'Session expired. Please log in again.',
        };
      } else {
        state.alert = {
          type: 'error',
          message: action.error.message ?? 'Unknown error occurred.',
        };
      }
    })

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
      if (
        action.error.message === 'token invalid' ||
        'No refresh token found'
      ) {
        state.alert = {
          type: 'error',
          message: 'Session expired. Please log in again.',
        };
        logoutAction(state);
      } else {
        state.alert = {
          type: 'error',
          message: action.error.message ?? 'Unknown error occurred.',
        };
      }
    })

    .addCase(handleError, (state, action) => {
      state.alert = {
        type: 'warning',
        message: action.payload ?? 'Unknown error occurred.',
      };
    })

    .addCase(clearUserAlert, (state) => {
      state.alert = null;
    })

    .addCase(setRememberMe, (state, action) => {
      state.rememberMe = action.payload;
    });
});

export default userReducer;
