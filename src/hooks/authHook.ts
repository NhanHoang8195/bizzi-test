import React from 'react';
import {AuthContext} from 'src/constants';

export function useAuth(context = AuthContext as React.Context<any>) {
  return React.useContext(context);
}
