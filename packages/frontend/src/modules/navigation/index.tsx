import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';

export const MainRouter = () => (
  <main>
    <Routes>
      {/* <Route component={HomePageContainer} path={APP_KEYS.ROUTER_KEYS.ROOT} /> */}
      <Route path={APP_KEYS.ROUTER_KEYS.ROOT} element={<HomePageContainer />} />
    </Routes>
  </main>
);
