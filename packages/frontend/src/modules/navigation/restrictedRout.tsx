import React from 'react';
import { Navigate } from 'react-router-dom';
import { RestrictedRouteType } from '../common/types/student.types';
import { ROUTER_KEYS, STORAGE_KEYS } from '../common/consts/app-keys.const';
import localStorageService from '../../services/localStorage.service';
import { useAuthCurrent } from '../common/hooks/useAuthQuery';

const RestrictedRout = ({
  component: Component,
  redirectTo = ROUTER_KEYS.ROOT
}: RestrictedRouteType) => {
  const { isError, isLoading } = useAuthCurrent();

  const isLoggedIn = localStorageService.get(STORAGE_KEYS.TOKEN);
  const shouldRedirect = isLoggedIn && !isLoading && !isError;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRout;
