import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthType, authAPI } from '../auth.api';


const slice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
});

export const authReducer = slice.reducer;
const register = createAsyncThunk(
  // 1 - prefix
  "auth/register",
  (arg: AuthType, thunkAPI) => {
    authAPI.register(arg).then((res) => {
      console.log(res)
    });
  }
);

// Санки давайте упакуем в объект, нам это пригодится в дальнейшем
export const authThunks = { register };
