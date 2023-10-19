import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckoutDetails = () => {
  const { productId } = useParams();

  // Replace these with your actual Redux selectors for profit and expense data
  const profits = useSelector((state) => state.benefits.benefits);
  const expenses = useSelector((state) => state.expenses.expenses);

  // Filter profits and expenses for the specific checkout
  const checkoutProfits = profits.filter(
    (profit) => profit.checkoutId === productId
  );
  const checkoutExpenses = expenses.filter(
    (expense) => expense.checkoutId === productId
  );

  return (
    <div>
      <h1>Checkout Details for {productId}</h1>
      <h2>Profit History</h2>
      <ul>
        {checkoutProfits.map((profit) => (
          <li key={profit.id}>Profit: {profit.amount}</li>
        ))}
      </ul>

      <h2>Expense History</h2>
      <ul>
        {checkoutExpenses.map((expense) => (
          <li key={expense.id}>Expense: {expense.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default CheckoutDetails;
