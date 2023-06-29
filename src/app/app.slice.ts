import { authAPI } from './../components/Auth/auth.api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../common/utils/create-app-async-thunk';
import { setProfile } from '../components/Auth/SingUp/auth.slice';


const slice = createSlice({
  name: 'app',
  initialState: {
    auth: false,
    initialized: false,
    name: '',
    avatar: '',
  },
  reducers: {
    singIn(state, action: PayloadAction<{auth: boolean}>) {
      state.auth = action.payload.auth
    }, 
    setInitialized(state, action: PayloadAction<{initialized: boolean}>) {
      state.initialized = action.payload.initialized
    }
  }
})
export const appReducer = slice.reducer;
export const {singIn, setInitialized} = slice.actions;

const authorization = createAppAsyncThunk("app/me", async (arg, thunkApi) => {
  thunkApi.dispatch(setInitialized({initialized: true}))
  const res = await authAPI.authMe();
  if(res.status === 200) {
    thunkApi.dispatch(singIn({auth: true}))
    thunkApi.dispatch(setProfile({email: res.data.email, name: res.data.name}))
  }
});

// Санки давайте упакуем в объект, нам это пригодится в дальнейшем
export const appThunks = { authorization };