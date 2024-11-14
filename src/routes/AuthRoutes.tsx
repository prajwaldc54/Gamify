import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoutes = () => {
  const token = localStorage.getItem('access_token');
  return <> {token ? <Navigate to="/" /> : <Outlet />}</>;
};

export default AuthRoutes;
