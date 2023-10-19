import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "./checkoutSlice";
import userReducer from "./userSlice";
import benefitSlice from "./benefitSlice"; 
import expenseSlice from "./expenseSlice"; 

const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
    user: userReducer,
    benefits: benefitSlice, 
    expenses: expenseSlice, 
  },
});

export default store;
