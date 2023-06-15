import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { Alert } from '@/@types/alert';
import { RootState } from '../store';
import { CountryFavorites } from '@/@types/countryFavorites';

interface UserState {
  username: string | null;
  isLogged: boolean;
  loading: boolean;
  sessionId: number | null;
  alert: Alert | null;
  favoritesCountries: CountryFavorites[];
}

const initialState: UserState = {
  username: null,
  isLogged: false,
  sessionId: null,
  loading: false,
  alert: null,
  favoritesCountries: [],
};

//Asynchronous actions
export const login = createAsyncThunk(
  'user/login',
  async (formInput: FormData) => {
    const obj = Object.fromEntries(formInput);
    try {
      const response = await axiosInstance.post('/log/in', obj);
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
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
  async (formInput: FormData, { getState }) => {
    const obj = Object.fromEntries(formInput);
    try {
      const { sessionId } = (getState() as RootState).user; // Utilisation de RootState pour annoter le type
      const response = await axiosInstance.put(`/user/${sessionId}`, obj);
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const accountDeletion = createAsyncThunk(
  'user/account-deletion',
  async (_, { getState }) => {
    try {
      const { sessionId } = (getState() as RootState).user; // Utilisation de RootState pour annoter le type
      const response = await axiosInstance.delete(`/user/${sessionId}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fecthFavoritesCountries = createAsyncThunk(
  'user/favorites-countries',
  async (_, { getState }) => {
    try {
      const { sessionId } = (getState() as RootState).user; // Utilisation de RootState pour annoter le type
      const response = await axiosInstance.get(`/user/${sessionId}`);

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

//Synchronous actions
export const logout = createAction('user/logout');
export const clearAlert = createAction('user/clearAlert');
export const handleError = createAction<string>('user/handleError');
export const messageUp = createAction<boolean>('message/popUp');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state, action) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;

      const { id, username, roles } = action.payload.data.session;
      state.isLogged = true;
      state.sessionId = id;
      state.username = username;
      if (roles && roles.includes('Admin')) {
        sessionStorage.setItem('userType', 'Admin');
      } else {
        sessionStorage.setItem('userType', 'User');
      }

      sessionStorage.setItem('sessionId', id.toString());
      sessionStorage.setItem('username', username);
      state.alert = {
        type: 'success',
        message: `Welcome ${state.username}`,
      };
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isLogged = false;
      state.sessionId = null;
      state.username = null;
      state.alert = {
        type: 'error',
        message: action.error.message ?? 'Unknown error occurred.',
      };
    })

    .addCase(logout, (state) => {
      state.isLogged = false;
      state.sessionId = null;
      state.username = null;
      sessionStorage.clear();
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
      sessionStorage.clear();
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

    .addCase(fecthFavoritesCountries.pending, (state, action) => {
      state.loading = true;
      state.alert = null;
    })
    .addCase(fecthFavoritesCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.favoritesCountries = action.payload;
    })
    .addCase(fecthFavoritesCountries.rejected, (state, action) => {
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
    .addCase(clearAlert, (state) => {
      state.alert = null;
    });
});

export default userReducer;
