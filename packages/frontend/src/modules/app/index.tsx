import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainRouter } from '../navigation';

import * as theme from '../theme';
import * as Styled from './app.styled';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      cacheTime: Infinity,
      retry: 1
    }
  }
});

const AppContainer = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Styled.GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <MainRouter />
        <Toaster position="top-right" reverseOrder={false} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default AppContainer;
