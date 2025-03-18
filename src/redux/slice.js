import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  samosa: 0,
  fries: 0,
  cheesyFries: 0,
  roll: 0,
};

const itemsSlice = createSlice({
  name: "Food items",
  initialState,
  reducers: {
    setSamosa: (state, action) => {
      state.samosa = action.payload;
    },
    setFries: (state, action) => {
      state.fries = action.payload;
    },
    setCheesyFries: (state, action) => {
      state.cheesyFries = action.payload;
    },
    setRoll: (state, action) => {
      state.roll = action.payload;
    },
    setAllTemps: (state, action) => {
        const { samosa, fries, cheesyFries, roll } = action.payload;
        state.samosa = samosa;
        state.fries = fries;
        state.cheesyFries = cheesyFries;
        state.roll = roll;
      },
    },
  });
  
  export const { setSamosa, setFries, setCheesyFries, setRoll, setAllItems } = itemsSlice.actions;
  export default itemsSlice.reducer;