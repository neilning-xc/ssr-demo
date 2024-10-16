import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './containers/Home';
import About from './containers/About';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default Routers;