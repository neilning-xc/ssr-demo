import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routers from './Routers';
import { makeClientStore } from './store';

const App = () => {
  return (
    <Provider store={makeClientStore()}>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </Provider>
  );
};

hydrateRoot(
  document.getElementById('app'),
  <App />
);