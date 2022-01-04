import React from 'react';
import {useQuery} from '@apollo/client';
import {GET_USER_INFO} from 'src/operations/queries/getUserInfo';
import {AuthContext} from 'src/constants';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const {data} = useQuery(GET_USER_INFO);
  console.log(data.user);
  return <AuthContext.Provider value={data.user}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
