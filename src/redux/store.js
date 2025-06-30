import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./slice"; // Ensure correct path
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    items: itemsReducer, // Ensure the correct key is used
    user: userReducer,
  },
});

export default store;
