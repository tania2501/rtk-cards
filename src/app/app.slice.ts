import { ThunkApiType } from './../components/Auth/SingUp/auth.slice';
import { authAPI } from './../components/Auth/auth.api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../common/utils/create-app-async-thunk';
import { setProfile } from '../components/Auth/SingUp/auth.slice';
import { thunkTryCatch } from '../common/utils/thunk-try-catch';


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
  }
})
export const appReducer = slice.reducer;
export const { singIn, setInitialized, setAppError } = slice.actions;

const authorization = createAppAsyncThunk("app/me", async (arg, thunkAPI) => {
  thunkAPI.dispatch(setInitialized({isLoading: true}))
  try {
    const res = await authAPI.authMe();
    thunkAPI.dispatch(singIn({ auth: true }))
    thunkAPI.dispatch(setProfile({ email: res.data.email, name: res.data.name }))
    thunkAPI.dispatch(setInitialized({isLoading: false}))
  } catch {
    thunkAPI.dispatch(setInitialized({isLoading: false}))
  }
});

// Санки давайте упакуем в объект, нам это пригодится в дальнейшем
export const appThunks = { authorization };