import { configureStore } from '@reduxjs/toolkit';
import { signUpEmailAddress } from "./Slices/signUpEmailAddress"; 
import currentUser from "./Slices/currentUser";
import tableCheckedItems from './Slices/tableCheckedItems';


export default configureStore({
    reducer: {
      signupemail: signUpEmailAddress,
      currentuser: currentUser,

      checkeditems: tableCheckedItems
    },
});
