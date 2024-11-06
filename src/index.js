import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HydrationBoundary, QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Routers from './Routers';
import { makeClientStore } from './store';
import { EventEmitterContext } from './context';

const hydrationState = window.INITIAL_STATE;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
    },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={hydrationState}>
        <EventEmitterContext.Provider value={null}>
          <Provider store={makeClientStore()}>
            <BrowserRouter>
              <Routers />
            </BrowserRouter>
          </Provider>
        </EventEmitterContext.Provider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

hydrateRoot(document.getElementById('app'), <App />);
