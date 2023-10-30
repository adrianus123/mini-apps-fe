import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    qrcode: "",
    nama: "-",
    wallet: 0,
  },
  reducers: {
    setCustomer: (state, action) => {
      if (action.payload) {
        const data = action.payload;
        Object.assign(state, data);
      }
    },
  },
});

export const { setCustomer } = customerSlice.actions;

export default customerSlice.reducer;

export const selectCurrentCustomer = (state) => state.customer;
