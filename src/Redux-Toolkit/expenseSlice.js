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
    editExpense: (state, action) => {
      // Find the expense to edit by ID
      const expenseToEdit = state.expenses.find((expense) => expense.id === action.payload.id);
      if (expenseToEdit) {
        // Update the expense properties
        expenseToEdit.userId = action.payload.userId;
        expenseToEdit.checkoutId = action.payload.checkoutId;
        expenseToEdit.amount = action.payload.amount;
        expenseToEdit.time = action.payload.time;

        // Save changes to local storage
        localStorage.setItem('Expenses', JSON.stringify(state.expenses));
      }
    },
  },
});

export const { addExpense, removeExpense, editExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
