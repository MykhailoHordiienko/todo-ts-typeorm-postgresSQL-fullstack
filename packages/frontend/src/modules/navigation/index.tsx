import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import AuthPageContainer from '../auth';
import LogIn from '../common/components/login/login.component';
import SignUp from '../common/components/signup/signup.component';
import RestrictedRout from './restrictedRout';
import PrivateRout from './privateRout';
import Error from '../common/components/error/error.component';

export const MainRouter = () => {
  const TODOS_URL = `${APP_KEYS.ROUTER_KEYS.ROOT}${APP_KEYS.ROUTER_KEYS.TODOS}`;

  return (
    <main>
      <Routes>
        <Route path={APP_KEYS.ROUTER_KEYS.ROOT} element={<AuthPageContainer />}>
          <Route
            path={APP_KEYS.ROUTER_KEYS.LOGIN}
            element={<RestrictedRout redirectTo={TODOS_URL} component={<LogIn />} />}
          />
          <Route
            path={APP_KEYS.ROUTER_KEYS.SIGNUP}
            element={<RestrictedRout redirectTo={TODOS_URL} component={<SignUp />} />}
          />
        </Route>
        <Route
          path={APP_KEYS.ROUTER_KEYS.TODOS}
          element={
            <PrivateRout redirectTo={APP_KEYS.ROUTER_KEYS.ROOT} component={<HomePageContainer />} />
          }
        />
        <Route path="*" element={<Error title="Wrong Address... Reload" />} />
      </Routes>
    </main>
  );
};
