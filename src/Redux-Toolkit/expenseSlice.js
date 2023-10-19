import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: JSON.parse(localStorage.getItem('Expenses')) || [],
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      localStorage.setItem('Expenses', JSON.stringify(state.expenses));
    },
    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
      localStorage.setItem('Expenses', JSON.stringify(state.expenses));
    },
  },
});

export const { addExpense, removeExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
