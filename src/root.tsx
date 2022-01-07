import React, {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import AuthRequired from 'src/components/authRequired';
import AuthProvider from 'src/components/authProvider';

const Login = React.lazy(() => import('src/containers/login'));
const Dashboard = React.lazy(() => import('src/containers/dashboard'));

function Root() {
  return (
      <main className={"bizzi-root-app"}>
        <Suspense fallback={<div>LOADING...</div>}>
          <AuthProvider>
            <Routes>
              <Route path={"/"} element={<AuthRequired />}>
                <Route path={"dashboard"} element={<Dashboard />} />
              </Route>
              <Route path={"/login"} element={<Login />} />
            </Routes>
          </AuthProvider>
        </Suspense>
      </main>
  );
}

export default Root;
