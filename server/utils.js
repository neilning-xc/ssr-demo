import React from 'react';
import { renderToString, renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { HydrationBoundary, QueryClientProvider, dehydrate, QueryClient } from '@tanstack/react-query';
const { Writable } = require('stream');
const { JSDOM } = require('jsdom');

import { EventEmitterContext } from '../src/context';
import Routers from '../src/Routers';
import { ee } from '../src/event-emitter';

export const renderHtml = (res, req, store) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        suspense: true,
      },
    },
  });
  const dehydratedState = dehydrate(queryClient);

  const template = `
    <html>
      <head>
        <title>My React App</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="app"><!-- app --></div>
        <script id="reactQueryState">
          window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;

  const templateDOM = new JSDOM(template);
  const { window } = templateDOM;
  const { document } = window;

  const stream = new Writable({
    write(chunk, encoding, callback) {
      res.write(chunk, callback);
    },
    final() {
      const html = templateDOM.serialize();
      [_, tail] = html.split('<!-- app -->');
      res.end(tail);
      queryClient.clear();
    }
  });
  
  ee.on('updateState', () => {
    const dehydratedState = dehydrate(queryClient);
    document.querySelector('#reactQueryState').innerHTML = `window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};`;
  });
  const { pipe } = renderToPipeableStream(
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <EventEmitterContext.Provider value={ee}>
          <Provider store={store}>
            <StaticRouter location={req.url}>
              <Routers />
            </StaticRouter>
          </Provider>
        </EventEmitterContext.Provider>
      </HydrationBoundary>
    </QueryClientProvider>,
    {
      onShellReady() {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        const html = templateDOM.serialize();
        const [head, _] = html.split('<!-- app -->');
        res.write(head);
        pipe(stream);
      },
    },
  );
  // return `<html>
  //     <head>
  //       <title>My React App</title>
  //       <link rel="stylesheet" href="/styles.css">
  //       <script>window.INITIAL_STATE = ${JSON.stringify(store.getState())}</script>
  //     </head>
  //     <body>
  //       <div id="app">${content}</div>
  //       <script src="/bundle.js"></script>
  //     </body>
  //   </html>`;
};
