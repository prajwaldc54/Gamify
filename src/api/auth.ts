import axios from 'utils/api';

export function register(data: any) {
  return axios({
    url: '/auth/register',
    method: 'post',
    data: { ...data },
  });
}

export function verifyUser(userId: Number | string, data: any) {
  return axios({
    url: `/auth/verify-user/${userId}`,
    method: 'patch',
    data: { ...data },
  });
}

export function resendCode(data: any) {
  return axios({
    url: '/auth/resend-code',
    method: 'post',
    data: { ...data },
  });
}

export function login(data: any) {
  return axios({
    url: '/auth/login',
    method: 'post',
    data: { ...data },
  });
}

export function refreshToken(refreshToken: string) {
  return axios({
    url: '/auth/refresh',
    method: 'get',
    headers: {
      refresh_token: refreshToken,
    },
  });
}

export function resetPassword(data: any) {
  return axios({
    url: '/auth/reset-password',
    method: 'patch',
    data: { ...data },
  });
}

export function forgotPassword(query: any) {
  return axios({
    url: '/auth/forgot-password',
    method: 'get',
    params: query,
  });
}

export function changePassword(data: any) {
  return axios({
    url: '/auth/change-password',
    method: 'patch',
    data: { ...data },
  });
}

export function logout() {
  return axios({
    url: '/auth/logout',
    method: 'delete',
  });
}

export function loggedInUser() {
  return axios({
    url: '/auth/loggedInUser',
    method: 'get',
  });
}
