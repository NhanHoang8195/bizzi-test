import React from 'react';
import {Navigate, useLocation, Outlet} from 'react-router-dom';
import {LOCALSTORAGE_KEYS} from 'src/constants';

function AuthRequired() {
  const token = localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN);
  let location = useLocation();
  if (token) {
    return <Outlet />
  }
  // if user haven't logged in yet, redirect them to login page, and rememeber the current location.
  return <Navigate to="/login" state={{from: location}} replace />;
}
export default AuthRequired;
