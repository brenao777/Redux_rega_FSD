import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import RouterProvider from './routes/RouterProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider />
      </Provider>
    </QueryClientProvider>
  );
}
