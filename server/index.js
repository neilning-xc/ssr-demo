import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';

import App from '../src/App';

const app = express();

const content = renderToString(<App />);

app.get('/', (req, res) => {
  res.send(
    `<html>
      <head>
        <title>My React App</title>
      </head>
      <body>
        <div id="app">${content}</div>
      </body>
    </html>`
  );
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

