import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        email: '',
    },
    reducers: {
        userLoggedIn: (state, action)=>{
            state.loggedIn = true;
            state.email = action.payload;
        },
        userLoggedOut:  (state, action)=>{
            state.loggedIn = false;
            state.email = '';
        },
    }
})

  export const { userLoggedIn, userLoggedOut } = userSlice.actions;
  export default userSlice.reducer;