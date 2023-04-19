import { createSlice } from "@reduxjs/toolkit";

export const tableCheckedItems = createSlice({
  name: "table-checked-items",
  initialState: {
    // checkeditems: {},
    checkeditems: [],
  },
  reducers: {
    setCheckedItems: (state, action) => {
      // const newCheckedItems = { ...action.payload };
      // state.checkeditems = newCheckedItems;
      const newCheckedItems = action.payload;
      state.checkeditems = newCheckedItems;
      console.log(state.checkeditems);
    },
  },
});
export const { setCheckedItems } = tableCheckedItems.actions;
export default tableCheckedItems.reducer;
