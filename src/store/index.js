import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';

// export default configureStore({
//   reducer: {
//     book: bookReducer,
//   },
// });

export const makeStore = () => {
  return configureStore({
    reducer: {
      book: bookReducer,
    },
  });
}

export const makeClientStore = () => {
  const defaultState = window.context ? window.context.state : {};

  return configureStore({
    reducer: {
      book: bookReducer,
    },
    preloadedState: defaultState,
  });
}


