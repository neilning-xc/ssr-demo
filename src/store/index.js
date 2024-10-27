import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';
import todoReducer from './todoSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      book: bookReducer,
      todo: todoReducer,
    },
  });
}

export const makeClientStore = () => {
  const defaultState = window.context ? window.context.state : {};

  return configureStore({
    reducer: {
      book: bookReducer,
      todo: todoReducer,
    },
    preloadedState: defaultState,
  });
}


