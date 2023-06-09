import { instance } from 'common/api/common.api';

export const authAPI =  {
  auth() {
    return instance.post('auth/login')
  },
  authMe() {
    return instance.post('auth/me')
  },
  register() {
    return instance.post('auth/register')
  }
}