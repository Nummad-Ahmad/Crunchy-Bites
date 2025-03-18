import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./slice"; // Ensure correct path

const store = configureStore({
  reducer: {
    items: itemsReducer, // Ensure the correct key is used
  },
});

export default store;
