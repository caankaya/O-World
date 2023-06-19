import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { Alert } from '@/@types/alert';
import jwt_decode from 'jwt-decode';
import { CountryFavorites } from '@/@types/countryFavorites';

interface UserState {
  username: string | null;
  isLogged: boolean;
  loading: boolean;
  alert: Alert | null;
  token: string;
  userIp: string;
  sessionId: number | null;
  roles: string[];
  rememberMe: boolean;
  infiniteLoading: Boolean;
  favoritesCountries: CountryFavorites[];
}

const initialState: UserState = {
  username: '',
  isLogged: false,
  loading: false,
  infiniteLoading: false,
  alert: null,
  token: '',
  userIp: '',
  sessionId: null,
  roles: [],
  rememberMe: false,
  favoritesCountries: [],
};

//Asynchronous actions
export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    const obj = Object.fromEntries(formData);
    try {
      const response = await axiosInstance.post('/log/in', obj);
      return response.data.data;
    } catch (error) {
      console.log('error:', error);
      throw error;
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
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const accountUpdate = createAsyncThunk(
  'user/account-update',
  async (formInput: FormData) => {
    const obj = Object.fromEntries(formInput);
    try {
      const response = await axiosInstance.put(
        `/user/${localStorage.id}`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const accountDeletion = createAsyncThunk(
  'user/account-deletion',
  async () => {
    try {
      const response = await axiosInstance.delete(`/user/${localStorage.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      });
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchFavoritesCountries = createAsyncThunk(
  'user/favorites-countries',
  async () => {
    try {
      const response = await axiosInstance.get(`/user/${localStorage.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      });
      if (
        response.data[0].favorite_countries.length > 0 &&
        response.data[0].favorite_countries.some((country: (string | null)[]) =>
          country.some((value) => value !== null)
        )
      ) {
        //Transforming the format of data received from the API
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
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const addFavoriteCountry = createAsyncThunk<any, { countryId: string }>(
  'user/add-favorite-country',
  async ({ countryId }) => {
    try {
      const response = await axiosInstance.post(
        `/user/${localStorage.id}/${countryId}`,
        {}, // Passer un objet vide en tant que corps de la requête
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const removeFavoriteCountry = createAsyncThunk<
  any,
  { countryId: string }
>('user/remove-favorite-country', async ({ countryId }) => {
  try {
    const response = await axiosInstance.delete(
      `/user/${localStorage.id}/${countryId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
});

//Synchronous actions
export const logout = createAction('user/logout');
export const clearUserAlert = createAction('user/clearAlert');
export const handleError = createAction<string>('user/handleError');
export const setRememberMe = createAction<boolean>('user/setRememberMe');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state, action) => {
      state.loading = true;
      state.alert = null;
      state.isLogged = false;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLogged = true;

      const accessToken: any = jwt_decode(action.payload.accessToken);
      const id = accessToken.data.id;
      const username = accessToken.data.username;
      const roles = accessToken.data.roles;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('id', id);
      localStorage.setItem('username', username);
      localStorage.setItem('roles', roles);

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
      state.isLogged = false;
      state.username = null;
      localStorage.clear();
      state.alert = {
        type: 'success',
        message: 'You are disconnected',
      };
    })

    .addCase(register.pending, (state, action) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(register.fulfilled, (state, action) => {
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

    .addCase(accountUpdate.pending, (state, action) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(accountUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'success',
        message: `Your account has been updated.`,
      };
    })
    .addCase(accountUpdate.rejected, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'error',
        message: action.error.message ?? 'Unknown error occurred.',
      };
    })

    .addCase(accountDeletion.pending, (state, action) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(accountDeletion.fulfilled, (state, action) => {
      state.loading = false;
      state.isLogged = false;
      state.sessionId = null;
      state.username = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.alert = {
        type: 'success',
        message: `Your account has been deleted.`,
      };
    })
    .addCase(accountDeletion.rejected, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'error',
        message: action.error.message ?? 'Unknown error occurred.',
      };
    })

    .addCase(fetchFavoritesCountries.pending, (state, action) => {
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
      state.alert = {
        type: 'error',
        message: action.error.message ?? 'Unknown error occurred.',
      };
    })

    .addCase(addFavoriteCountry.pending, (state, action) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(addFavoriteCountry.fulfilled, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'success',
        message: `Country added to favorites.`,
      };
    })
    .addCase(addFavoriteCountry.rejected, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'error',
        message: action.error.message ?? 'Unknown error occurred.',
      };
    })

    .addCase(removeFavoriteCountry.pending, (state, action) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(removeFavoriteCountry.fulfilled, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'success',
        message: `Country deleted to favorites.`,
      };
    })
    .addCase(removeFavoriteCountry.rejected, (state, action) => {
      state.loading = false;
      state.alert = {
        type: 'error',
        message: action.error.message ?? 'Unknown error occurred.',
      };
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
