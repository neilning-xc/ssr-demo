import React from 'react';

const Html = ({ children, initialState }) => {
  return (
    <html>
      <head>
        <title>My React App</title>
        <link rel="stylesheet" href="/styles.css" />
        <script id="reactQueryState" dangerouslySetInnerHTML={{
          __html: `window.REACT_QUERY_STATE = ${JSON.stringify(initialState)};`
        }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.INITIAL_STATE = ${JSON.stringify(initialState)};`
          }}
        />
      </head>
      <body>
        <div id="app">{children}</div>
        {/* <script src="/bundle.js"></script> */}
      </body>
    </html>
  );
}

export default Html;