import { appReducer } from './app.slice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { loginReducer } from '../components/Auth/Login/login.slice';
import { authReducer } from '../components/Auth/SingUp/auth.slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    app: appReducer,
    login: loginReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
