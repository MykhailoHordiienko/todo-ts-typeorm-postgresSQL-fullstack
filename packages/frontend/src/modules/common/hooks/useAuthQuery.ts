import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { AUTH_KEY } from '../consts/app-keys.const';
import HttpAuthService from '../../../services/httpAuth.service';
import { AuthType, UpdateAuthType } from '../types/student.types';
import localStorageService from '../../../services/localStorage.service';
import { APP_KEYS } from '../consts';

const authService = new HttpAuthService();

const TODOS_URL = `${APP_KEYS.ROUTER_KEYS.ROOT}${APP_KEYS.ROUTER_KEYS.TODOS}`;

export const useAuthCurrent = () => {
  const navigate = useNavigate();

  const { isError, isLoading } = useQuery({
    queryFn: () => authService.current(),
    queryKey: [AUTH_KEY.USER],
    onSuccess: () => {
      navigate(TODOS_URL, { replace: true });
    }
  });
  return { isError, isLoading };
};

export const useAuthSignIn = () => {
  const client = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signIn, isSuccess } = useMutation({
    mutationFn: (data: AuthType) => authService.signIn(data),
    onSuccess: ({ data }) => {
      localStorageService.save('token', data.token);
      toast.success('Hi!');
      navigate(TODOS_URL, { replace: true });
      client.invalidateQueries();
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data.message);
      } else {
        toast.error(`${err.message} Reload Please`);
      }
    }
  });
  return { signIn, isSuccess };
};

export const useAuthSignUp = () => {
  const { mutate: signUp, isSuccess } = useMutation({
    mutationFn: (data: AuthType) => authService.signUp(data),
    onSuccess: () => {
      toast.success('Check your email to verify account!');
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data.message);
      } else {
        toast.error(`${err.message} Reload Please`);
      }
    }
  });
  return { signUp, isSuccess };
};

export const useUpdateUser = () => {
  const { mutate: updateUser, isSuccess } = useMutation({
    mutationFn: (data: UpdateAuthType) => authService.update(data),
    onSuccess: () => {
      toast.success('Password Changed!');
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data.message);
      } else {
        toast.error(`${err.message} Reload Please`);
      }
    }
  });
  return { updateUser, isSuccess };
};

export const useLogOutUser = () => {
  const client = useQueryClient();

  const navigate = useNavigate();
  const logOut = () => {
    localStorageService.remove('token');
    client.removeQueries();
    navigate(APP_KEYS.ROUTER_KEYS.ROOT, { replace: true });
  };

  return { logOut };
};
