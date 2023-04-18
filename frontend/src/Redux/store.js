import { configureStore } from '@reduxjs/toolkit';
import { signUpEmailAddress } from "./Slices/signUpEmailAddress"; 
import currentUser from "./Slices/currentUser";


export default configureStore({
    reducer: {
      signupemail: signUpEmailAddress,
      currentuser: currentUser,

    },
});
