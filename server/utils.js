import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import Routers from '../src/Routers';

export const renderHtml = (res, req, ssrStore) => {
  const content = renderToString(
    <Provider store={ssrStore}>
      <StaticRouter location={req.url}>
        <Routers />
      </StaticRouter>
     </Provider>
  );

  return `<html>
      <head>
        <title>My React App</title>
        <link rel="stylesheet" href="/styles.css">
        <script>
          window.context = {
            state: ${JSON.stringify (ssrStore.getState())}
          }
        </script>
      </head>
      <body>
        <div id="app">${content}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>`
};