import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        email: '',
        wins: 0
    },
    reducers: {
        userLoggedIn: (state, action)=>{
            state.loggedIn = true;
            state.email = action.payload.email;
            state.wins = action.payload.wins;
        },
        userLoggedOut:  (state, action)=>{
            state.loggedIn = false;
            state.email = '';
            state.wins = 0;
        },
    }
})

  export const { userLoggedIn, userLoggedOut } = userSlice.actions;
  export default userSlice.reducer;