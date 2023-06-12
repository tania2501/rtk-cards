import { ProfileType } from './../auth.api';
import { AppDispatch } from './../../../app/store';
import { Navigate } from 'react-router-dom';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthType, authAPI } from '../auth.api';
import { createAppAsyncThunk } from '../../../common/utils/create-app-async-thunk';
import { setInitialized, singIn } from '../../../app/app.slice';


const slice = createSlice({
  name: "login",
  initialState: {
    profile: {} as ProfileType,
  },
  reducers: {
    setProfile(state, action: PayloadAction<{email: string, name: string, avatar?: string}>) {
      state.profile = action.payload
    }
  }
});

export const loginReducer = slice.reducer;
export const {setProfile} = slice.actions;
const login = createAppAsyncThunk("auth/login", async (arg: AuthType & {rememberMe: boolean}, thunkApi) => {
  const res = await authAPI.login(arg);
  thunkApi.dispatch(setInitialized({initialized: true}))
  if(res.status === 200) {
    thunkApi.dispatch(singIn({auth: true}))
    thunkApi.dispatch(setInitialized({initialized: true}))
  }
  
});
const logOut = createAppAsyncThunk("auth/logOut", async (arg, thunkApi) => {
  await authAPI.logOut();
  thunkApi.dispatch(singIn({auth: false}))
});
// Санки давайте упакуем в объект, нам это пригодится в дальнейшем
export const loginThunks = { login, logOut };
