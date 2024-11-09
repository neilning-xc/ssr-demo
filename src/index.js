import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  HydrationBoundary,
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';

import Routers from './Routers';
import { makeClientStore } from './store';
import { EventEmitterContext } from './context';

const App = () => {
  return (
    <Provider store={makeClientStore()}>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </Provider>
  );
};

const hydrationState = window.__REACT_QUERY_STATE__;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
    },
  },
});
const StramApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={hydrationState}>
        <EventEmitterContext.Provider value={null}>
          <BrowserRouter>
            <Routers />
          </BrowserRouter>
        </EventEmitterContext.Provider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

// hydrateRoot(document.getElementById('app'), <App />);
hydrateRoot(document.getElementById('app'), <StramApp />);
