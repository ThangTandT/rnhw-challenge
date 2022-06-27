import {configureStore} from '@reduxjs/toolkit';
import appReducer from './app/reducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
