import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counter from './reducers/counter';
import tasks from './reducers/tasks';
import products from './reducers/products';

export const store = configureStore({
  reducer: combineReducers({
    counter,
    tasks,
    products,
  }),
  // devTools: process.env.NODE_ENV !== 'production',
});
