import React from 'react';

import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <ul>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/about'>About</a>
          </li>
          <li>
            <a href='/contact'>Contact</a>
          </li>
        </ul>
      </header>
      <div className="main">
        {children}
      </div>
    </div>
  );
};

export default Layout;