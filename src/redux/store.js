import { configureStore, combineReducers } from "@reduxjs/toolkit";
import itemsReducer from "./slice";
import userReducer from './userSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // localStorage by default

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Only persist the user slice
};

const rootReducer = combineReducers({
  items: itemsReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
