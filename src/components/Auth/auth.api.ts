import  instance  from 'common/api/common.api';

export const authAPI = {
  login(arg: AuthType & { rememberMe: boolean }) {
    return instance.post('auth/login', arg)
  },
  authMe() {
    return instance.post('auth/me')
  },
  register(arg: AuthType) {
    return instance.post('auth/register', arg)
  },
  logOut() {
    return instance.delete('auth/me')
  },
  forgot(arg: ForgotPasswordType) {
    return instance.post('auth/forgot', arg)
  },
  setPassword(arg: SetPasswordType) {
    return instance.post('auth/set-new-password', arg)
  },
  changeName(data: UserDataType) {
    return instance.put('auth/me', data)
  }
}
export type SetPasswordType = {
  password: string
  resetPasswordToken: string | undefined
}
export type ForgotPasswordType = {
  email: string,
  from: string,
  message: string
}
export type AuthType = {
  email: string,
  password: string
}
export type RegisterResponseType = {
  addedUser: {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
  };
};
export type ProfileType = {
  email: string;
  name: string;
  avatar?: string;
}
export type UserDataType = {
  name?: string
  avatar?: string
}