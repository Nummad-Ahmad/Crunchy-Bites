import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        isAdmin: false,
    },
    reducers: {
        userLoggedIn: (state, action)=>{
            state.loggedIn = true;
        },
        userLoggedOut:  (state, action)=>{
            state.loggedIn = false;
        },
        setAdmin: (state, action)=>{
            state.isAdmin = true;
        },
        unsetAdmin: (state, action)=>{
            state.isAdmin = false;
        }
    }
})

  export const { userLoggedIn, userLoggedOut, setAdmin, unsetAdmin } = userSlice.actions;
  export default userSlice.reducer;