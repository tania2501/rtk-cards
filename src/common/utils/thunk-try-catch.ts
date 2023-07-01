import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { RootState, AppDispatch } from "app/store";

export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>, logic: Function) => {
  const { rejectWithValue } = thunkAPI;
  try {
    return await logic();
  } catch (e) {
    return rejectWithValue(e);
  }
};