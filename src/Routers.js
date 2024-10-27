import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './containers/Home';
import Todo from './containers/Todo';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
};

export default Routers;