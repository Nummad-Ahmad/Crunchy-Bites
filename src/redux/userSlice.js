import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        email: '',
        wins: 0,
        notificationRead: '',
    },
    reducers: {
        userLoggedIn: (state, action)=>{
            state.loggedIn = true;
            state.email = action.payload.email;
            state.wins = action.payload.wins;
            state.notificationRead = action.payload.notificationRead;
        },
        userLoggedOut:  (state, action)=>{
            state.loggedIn = false;
            state.email = '';
            state.wins = 0;
            state.notificationRead = true;
        },
            setWinnerNotification: (state, action) => {
      state.notificationRead = action.payload; 
    }
    }
})

  export const { userLoggedIn, userLoggedOut, setWinnerNotification } = userSlice.actions;
  export default userSlice.reducer;