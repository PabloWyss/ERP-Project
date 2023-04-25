import { createSlice } from "@reduxjs/toolkit";

export const orderBuySellRefund = createSlice({
  name: "order-buy-sell-refund",
  initialState: {
    isbuy: true,
    isrefund: false,
    partner: {},
    item: {},
    quantity: 1,
    warehouse: 0,
  },
  reducers: {
    setOrderIsBuy: (state) => {
      state.isbuy = !state.isbuy;
    },
    setOrderIsRefund: (state) => {
      state.isrefund = !state.isrefund;
    },
    setPartner: (state, action) => {
      const newPartner = { ...action.payload };
      state.partner = newPartner;
    },
    setItem: (state, action) => {
      const newItem = { ...action.payload };
      state.item = newItem;
    },
    setOrderQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setWarehouse: (state, action) => {
      state.warehouse = action.payload;
    },
  },
});
export const {
  setOrderIsBuy,
  setOrderIsRefund,
  setPartner,
  setItem,
  setOrderQuantity,
  setWarehouse,
} = orderBuySellRefund.actions;
export default orderBuySellRefund.reducer;
