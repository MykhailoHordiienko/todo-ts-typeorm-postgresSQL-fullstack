import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '../common/components/container/container.component';
import * as Styled from './authPageContainer.styled';
import Link from '../common/components/link/link.component';
import { APP_KEYS } from '../common/consts';
import { useAuthCurrent } from '../common/hooks/useAuthQuery';

const AuthPageContainer = () => {
  useAuthCurrent();
  return (
    <Container>
      <Styled.Container>
        <h1>App Name</h1>
        <Styled.LinkContainer>
          <Link title="Log In" to={APP_KEYS.ROUTER_KEYS.LOGIN} />
          <Link title="Sign Up" to={APP_KEYS.ROUTER_KEYS.SIGNUP} />
        </Styled.LinkContainer>
      </Styled.Container>
      <Outlet />
    </Container>
  );
};

export default AuthPageContainer;
