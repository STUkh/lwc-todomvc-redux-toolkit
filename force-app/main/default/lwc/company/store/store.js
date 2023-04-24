import { reduxToolkit } from 'company/reduxLibs';
import { saveTodosToLocalStorage } from 'company/utils';
import rootReducer from './reducers.js';

const { configureStore } = reduxToolkit;

const preloadedState = {};

export const localStorageMiddleware = (store) => (next) => (action) => {
  // Call the next middleware or reducer with the action
  const result = next(action);

  // Save the current state to local storage
  const state = store.getState();
  saveTodosToLocalStorage(state.todos);

  // Return the result of the next middleware or reducer
  return result;
};

/**
 * Our global Redux store instance
 */
export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export const { dispatch, subscribe, getState, replaceReducer } = store;

export default store;