import { ForgotPasswordType, SetPasswordType } from './../auth.api';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthType, ProfileType, authAPI } from '../auth.api';
import { createAppAsyncThunk } from "../../../common/utils/create-app-async-thunk";
import { setInitialized, singIn } from "../../../app/app.slice";
import globalRouter from '../../../common/utils/globalRouter';


const slice = createSlice({
  name: "auth",
  initialState: {
    profile: {} as ProfileType,
    email: '',
    isDone: false
  },
  reducers: {
    setProfile(state, action: PayloadAction<{email: string, name: string, avatar?: string}>) {
      state.profile = action.payload
    },
    setEmail(state, action: PayloadAction<{email: string}>) {
      state.email = action.payload.email
    },
    setIsDone(state, action: PayloadAction<{isDone: boolean}>) {
      state.isDone = action.payload.isDone
    }
  },
});

export const authReducer = slice.reducer;
export const {setProfile, setEmail, setIsDone} = slice.actions;
const register = createAsyncThunk(
  // 1 - prefix
  "auth/register",
  (arg: AuthType, thunkAPI) => {
    authAPI.register(arg).then((res) => {
      console.log(res)
    });
  }
);
const login = createAppAsyncThunk("auth/login", async (arg: AuthType & {rememberMe: boolean}, thunkApi) => {
  const res = await authAPI.login(arg);
  thunkApi.dispatch(setInitialized({initialized: true}))
  if(res.status === 200) {
    thunkApi.dispatch(singIn({auth: true}))
    thunkApi.dispatch(setInitialized({initialized: true}))
    thunkApi.dispatch(setProfile({email: res.data.email, name: res.data.name}))
  }
});
const logOut = createAppAsyncThunk("auth/logOut", async (arg, thunkApi) => {
  await authAPI.logOut();
  thunkApi.dispatch(singIn({auth: false}))
});
const forgot = createAppAsyncThunk("auth/forgot", async (email: string, thunkAPI) => {
  const res = await authAPI.forgot({email: email, from: 'test-front-admin <ai73a@yandex.by>', message: "<div> password recovery link: <a href='https://tania2501.github.io/rtk-cards/#/set-new-password/$token$'>link</a></div>"})
  console.log(res)
  if(res.data.success) {
    thunkAPI.dispatch(setIsDone({isDone: true}))
  }
  thunkAPI.dispatch(setIsDone({isDone: true}))
  thunkAPI.dispatch(setEmail({email}))
})
const setPassword = createAppAsyncThunk("auth/setPassword", async (arg: SetPasswordType, thunkAPI) => {
  const res = await authAPI.setPassword(arg)
  if(res.data.success && globalRouter.navigate) {
    globalRouter.navigate("/login")
  }
})
// Санки давайте упакуем в объект, нам это пригодится в дальнейшем
export const authThunks = { register, login, logOut, forgot, setPassword };
