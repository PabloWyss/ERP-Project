import { createSlice } from "@reduxjs/toolkit";

export const orderBuySellRefund = createSlice({
  name: "order-buy-sell-refund",
  initialState: {
    isbuy: true,
    isrefund: false,
  },
  reducers: {
    setOrderIsBuy: (state) => {
      state.isbuy = !state.isbuy;
    },
    setOrderIsRefund: (state) => {
      state.isrefund = !state.isrefund;
    },
  },
});
export const { setOrderIsBuy, setOrderIsRefund} = orderBuySellRefund.actions;
export default orderBuySellRefund.reducer;
