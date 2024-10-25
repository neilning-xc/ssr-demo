import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';

import { makeStore } from '../src/store';
import { setBookList } from '../src/store/bookSlice';
import Routers from '../src/Routers';

const app = express();
app.use(express.static('client-build'));

app.get('/', async (req, res) => {
  const ssrStore = makeStore();

  const state = ssrStore.getState();
  const keyword = state.book.keyword;
  const data = await fetch(`https://book-db-v1.saltyleo.com/?keyword=${keyword}`)
      .then((res) => {
        return res.json();
      });
  ssrStore.dispatch(setBookList(data));

  const content = renderToString(
    <Provider store={ssrStore}>
      <StaticRouter location={req.url}>
        <Routers />
      </StaticRouter>
     </Provider>
  );

  res.send(
    `<html>
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
    </html>`,
  );
});

app.get('/api/bookList', async (req, res) => {
  const keyword = req.query.keyword || '刘慈欣';
  const data = await fetch(`https://book-db-v1.saltyleo.com/?keyword=${keyword}`).then((res) => res.json());
  res.send(data);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
