import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  benefits: JSON.parse(localStorage.getItem('Benefits')) || [],
};

const benefitSlice = createSlice({
  name: 'benefit',
  initialState,
  reducers: {
    addBenefit: (state, action) => {
      state.benefits.push(action.payload);
      localStorage.setItem('Benefits', JSON.stringify(state.benefits));
    },
    removeBenefit: (state, action) => {
      state.benefits = state.benefits.filter((benefit) => benefit.id !== action.payload);
      localStorage.setItem('Benefits', JSON.stringify(state.benefits));
    },
  },
});

export const { addBenefit, removeBenefit } = benefitSlice.actions;

export default benefitSlice.reducer;
