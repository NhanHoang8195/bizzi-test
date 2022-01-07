import React from 'react';
import {GoogleUserProfile} from 'src/models/googleUserProfile';

export const REGREX = {
  EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
};

export const LOCALSTORAGE_KEYS = {
  TOKEN: 'token',
};
export const initialUserProfile: GoogleUserProfile = {
  email: "bizzi_test@bizzi.com",
  familyName: "Bizzi",
  givenName: "Test",
  googleId: "104376442523909435270",
  imageUrl: "https://lh3.googleusercontent.com/a-/AOh14Ghx8ZDQwRIUaHpoYHIbKWxZ4q77H-QEm1YxHcAIsQ=s96-c",
  name: "Bizzi Test",
  tokenId: localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN),
}

export const AuthContext = React.createContext<any>(initialUserProfile);
