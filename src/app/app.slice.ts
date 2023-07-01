import { authAPI } from './../components/Auth/auth.api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../common/utils/create-app-async-thunk';
import { setProfile } from '../components/Auth/SingUp/auth.slice';
import { AxiosError, isAxiosError } from 'axios';


const slice = createSlice({
  name: 'app',
  initialState: {
    auth: false,
    isLoading: false,
    error: null as string | null,
    name: '',
    avatar: '',
  },
  reducers: {
    singIn(state, action: PayloadAction<{ auth: boolean }>) {
      state.auth = action.payload.auth
    },
    setInitialized(state, action: PayloadAction<{ isLoading: boolean }>) {
      state.isLoading = action.payload.isLoading
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          const err = action.payload ? action.payload : action.error as Error | AxiosError<{ error: string }>;
          if (isAxiosError(err)) {
            state.error = err.response ? err.response.data.error : err.message;
          } else {
            state.error = `Native error ${err.message}`;
          }
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
})
export const appReducer = slice.reducer;
export const { singIn, setInitialized, setAppError } = slice.actions;

const authorization = createAppAsyncThunk("app/me", async (arg, thunkAPI) => {
  const res = await authAPI.authMe();
  thunkAPI.dispatch(singIn({ auth: true }))
  thunkAPI.dispatch(setProfile({ email: res.data.email, name: res.data.name }))
});

// Санки давайте упакуем в объект, нам это пригодится в дальнейшем
export const appThunks = { authorization };