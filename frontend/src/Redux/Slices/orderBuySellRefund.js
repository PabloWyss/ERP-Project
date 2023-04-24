import { createSlice } from "@reduxjs/toolkit";

export const orderBuySellRefund = createSlice({
  name: "order-buy-sell-refund",
  initialState: {
    isbuy: true,
    isrefund: false,
    partner: {},
    item: {},
    quantity: 1,
    warehouse: {},
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
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setWarehouse: (state, action) => {
      const newWarehouse = { ...action.payload };
      state.warehouse = newWarehouse;
    },
  },
});
export const {
  setOrderIsBuy,
  setOrderIsRefund,
  setPartner,
  setItem,
  setQuantity,
  setWarehouse,
} = orderBuySellRefund.actions;
export default orderBuySellRefund.reducer;
