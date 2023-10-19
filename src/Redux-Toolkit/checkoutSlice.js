import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  names: JSON.parse(localStorage.getItem("Names_checheckout")) || [],
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addCheckoutName: (state, action) => {
      const checkout = {
        id: state.names.length + 1, // Generate a unique ID
        name: action.payload, // Use the provided checkout name
      };
      state.names.push(checkout);
      localStorage.setItem("Names_checheckout", JSON.stringify(state.names));
    },
    removeCheckoutName: (state, action) => {
      state.names = state.names.filter((checkout) => checkout.id !== action.payload);
      localStorage.setItem("Names_checheckout", JSON.stringify(state.names));
    },
  },
});

export const { addCheckoutName, removeCheckoutName } = checkoutSlice.actions;

export default checkoutSlice.reducer;
