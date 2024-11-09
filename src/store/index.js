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
};

export const makeClientStore = () => {
  const defaultState = window.INITIAL_STATE || {};
  return configureStore({
    reducer: {
      book: bookReducer,
      todo: todoReducer,
    },
    preloadedState: defaultState,
  });
};
