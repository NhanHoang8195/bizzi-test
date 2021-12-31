import React, {Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from  './containers/login';
// const Login = React.lazy(() => import('@app/containers/login'));

function Root() {
  return (
      <div className={"bizzi-root-app"}>
        <Suspense fallback={<div>LOADING...</div>}>
          <Routes>
            {/*<Route path="/" element={<Home />} />*/}
            <Route path="login" element={<Login />} />
          </Routes>
        </Suspense>
      </div>
  );
}

export default Root;
