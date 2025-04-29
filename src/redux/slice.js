import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  samosa: 0,
  fries: 0,
  cheesyFries: 0,
  roll: 0,
  chocoMilk: 0,
  lemonade: 0
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
    setLemonade: (state, action)=>{
      state.lemonade = action.payload;
    },
    setChocoMilk: (state, action) => {
      state.lemonade = action.payload;
    },
    setAllTemps: (state, action) => {
        const { samosa, fries, cheesyFries, roll, chocoMilk, lemonade } = action.payload;
        state.samosa = samosa;
        state.fries = fries;
        state.cheesyFries = cheesyFries;
        state.roll = roll;
        state.lemonade = lemonade;
        state.chocoMilk = chocoMilk;
      },
    },
  });
  
  export const { setSamosa, setFries, setCheesyFries, setRoll, setAllItems, setChocoMilk, setLemonade } = itemsSlice.actions;
  export default itemsSlice.reducer;