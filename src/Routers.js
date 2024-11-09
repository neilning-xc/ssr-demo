import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './containers/Home';
import Todo from './containers/Todo';
import Stream from './containers/Stream';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/stream" element={<Stream />} />
    </Routes>
  );
};

export default Routers;
