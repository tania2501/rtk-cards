import { setInitialized } from 'app/app.slice';
import { SetPasswordType, UserDataType } from './../auth.api';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthType, ProfileType, authAPI } from '../auth.api';
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { singIn } from "app/app.slice";
import { thunkTryCatch } from 'common/utils/thunk-try-catch';
import { AppDispatch, RootState } from '../../../app/store';



const slice = createSlice({
  name: "auth",
  initialState: {
    profile: {} as ProfileType,
    email: '',
  },
  reducers: {
    setProfile(state, action: PayloadAction<{ email: string, name: string, avatar?: string }>) {
      state.profile = action.payload
    },
    setEmail(state, action: PayloadAction<{ email: string }>) {
      state.email = action.payload.email
    },
  },
});

export const authReducer = slice.reducer;
export const { setProfile, setEmail } = slice.actions;
const register = createAsyncThunk<void, AuthType, ThunkApiType>("auth/register", async (arg: AuthType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.register(arg);
    console.log("register", res);
  });
}
);

const login = createAppAsyncThunk<void, AuthType & { rememberMe: boolean }, ThunkApiType>("auth/login", async (arg: AuthType & { rememberMe: boolean }, thunkAPI) => {
  thunkAPI.dispatch(setInitialized({isLoading: true}))
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.login(arg);
    thunkAPI.dispatch(singIn({ auth: true }))
    thunkAPI.dispatch(setProfile({ email: res.data.email, name: res.data.name }))
    thunkAPI.dispatch(setInitialized({isLoading: false}))
  });
});

const logOut = createAppAsyncThunk<void, void, ThunkApiType>("auth/logOut", async (arg, thunkAPI) => {
  thunkAPI.dispatch(setInitialized({isLoading: true}))
  return thunkTryCatch(thunkAPI, async () => {
    await authAPI.logOut();
    thunkAPI.dispatch(singIn({ auth: false }))
    thunkAPI.dispatch(setInitialized({isLoading: false}))
  });
});

const forgot = createAppAsyncThunk<void, string, ThunkApiType>("auth/forgot", async (email: string, thunkAPI) => {
  thunkAPI.dispatch(setInitialized({isLoading: true}))
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.forgot({ email: email, from: 'test-front-admin <ai73a@yandex.by>', message: `<div> password recovery link: <a href='https://tania2501.github.io/rtk-cards/setNewPassword/$token$'>link</a></div>` })
    console.log(res)
    thunkAPI.dispatch(setEmail({ email }))
    thunkAPI.dispatch(setInitialized({isLoading: false}))
  });
});

const setPassword = createAppAsyncThunk<void, SetPasswordType, ThunkApiType>("auth/setPassword", async (arg: SetPasswordType, thunkAPI) => {
  thunkAPI.dispatch(setInitialized({isLoading: true}))
  return thunkTryCatch(thunkAPI, async () => {
    await authAPI.setPassword(arg)
    thunkAPI.dispatch(setInitialized({isLoading: false}))
  });
})
const changeName = createAppAsyncThunk<void, UserDataType, ThunkApiType>("auth/changeName", async (arg: UserDataType, thunkAPI) => {
  thunkAPI.dispatch(setInitialized({isLoading: true}))
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.changeName(arg)
    thunkAPI.dispatch(setProfile({ email: res.data.updatedUser.email, name: res.data.updatedUser.name }))
    thunkAPI.dispatch(setInitialized({isLoading: false}))
  });
})
// Санки давайте упакуем в объект, нам это пригодится в дальнейшем
export const authThunks = { register, login, logOut, forgot, setPassword, changeName };
//types
export type ThunkApiType = {
  state: RootState, 
  dispatch: AppDispatch, 
}