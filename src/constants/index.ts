import React from "react";
import {initialUserProfile} from 'src/operations/cached';

export const REGREX = {
  EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
};

export const LOCALSTORAGE_KEYS = {
  TOKEN: 'token',
};

export let AuthContext = React.createContext<any>(initialUserProfile);
