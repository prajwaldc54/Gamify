import useCheckUser from 'hooks/useCheckUser';
import React from 'react';
import { Outlet } from 'react-router-dom';

const OtherProtectedRoutes = () => {
  useCheckUser();
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default OtherProtectedRoutes;
