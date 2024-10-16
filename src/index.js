import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Routers from './Routers';

const App = () => {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
};

hydrateRoot(
  document.getElementById('app'),
  <React.StrictMode>
    <App />
  </React.StrictMode>
);