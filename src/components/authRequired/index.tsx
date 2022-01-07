import React from 'react';
import {Navigate, useLocation, Outlet} from 'react-router-dom';
import {useAuth} from 'src/hooks/authHook';
import Header from 'src/components/header';

function AuthRequired() {
  let location = useLocation();
  const userInfo = useAuth();
  if (userInfo.tokenId) {
    return <div>
      <Header />
      <Outlet />
    </div>
  }
  // if user haven't logged in yet, redirect them to login page, and rememeber the current location.
  return <Navigate to="/login" state={{from: location}} replace />;
}
export default AuthRequired;
