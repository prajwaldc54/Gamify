import { logout } from 'api/auth';

export const logoutUser = () => {
  localStorage.clear();
  logout();
  window.location.href = '/login';
};
