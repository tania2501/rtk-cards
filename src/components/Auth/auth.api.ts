import { instance } from 'common/api/common.api';

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
  }
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