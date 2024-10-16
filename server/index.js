import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';

import Routers from '../src/Routers';

const app = express();
app.use(express.static('client-build'));

app.get('*', (req, res) => {
  const content = renderToString(
    <StaticRouter location={req.url}>
      <Routers />
    </StaticRouter>,
  );

  res.send(
    `<html>
      <head>
        <title>My React App</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="app">${content}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>`,
  );
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
