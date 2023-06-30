import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { RootState, AppDispatch } from "app/store";
import { setAppError, setInitialized } from "app/app.slice";
import { AxiosError, isAxiosError } from "axios";

export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, null>, logic: Function) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    return await logic();
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    if (isAxiosError(err)) {
      const error = err.response ? err.response.data.error : err.message;
      dispatch(setAppError({ error }));
      thunkAPI.dispatch(setInitialized({isLoading: false}))
    } else {
      dispatch(setAppError({ error: `Native error ${err.message}` }));
      thunkAPI.dispatch(setInitialized({isLoading: false}))
    }
    return rejectWithValue(null);
  }
};