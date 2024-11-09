import React from 'react';

import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/todo">Todo</a>
          </li>
          <li>
            <a href="/stream">Stream</a>
          </li>
        </ul>
      </header>
      <div className="main">{children}</div>
    </div>
  );
};

export default Layout;
