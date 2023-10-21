import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  benefits: JSON.parse(localStorage.getItem("Benefits")) || [],
};

const benefitSlice = createSlice({
  name: "benefit",
  initialState,
  reducers: {
    addBenefit: (state, action) => {
      state.benefits.push(action.payload);
      localStorage.setItem("Benefits", JSON.stringify(state.benefits));
    },
    removeBenefit: (state, action) => {
      state.benefits = state.benefits.filter(
        (benefit) => benefit.id !== action.payload
      );
      localStorage.setItem("Benefits", JSON.stringify(state.benefits));
    },
    editBenefit: (state, action) => {
      const { id, userId, checkoutId, amount, time } = action.payload;
      const benefitToEdit = state.benefits.find((benefit) => benefit.id === id);
      if (benefitToEdit) {
        benefitToEdit.userId = userId;
        benefitToEdit.checkoutId = checkoutId;
        benefitToEdit.amount = amount;
        benefitToEdit.time = time;
        localStorage.setItem("Benefits", JSON.stringify(state.benefits));
      }
    },
  },
});

export const { addBenefit, removeBenefit, editBenefit } = benefitSlice.actions;

export default benefitSlice.reducer;
