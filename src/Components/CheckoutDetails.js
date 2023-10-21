import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, ListGroup, Alert } from "react-bootstrap";

const CheckoutDetails = () => {
  const { checkoutID } = useParams();

  const profits = useSelector((state) => state.benefits.benefits);
  const expenses = useSelector((state) => state.expenses.expenses);
  const checkoutNames = useSelector((state) => state.checkout.names);

  const [checkoutProfits, setCheckoutProfits] = useState([]);
  const [checkoutExpenses, setCheckoutExpenses] = useState([]);
  const [checkoutName, setCheckoutName] = useState("");
  const [totalProfits, setTotalProfits] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    setCheckoutProfits(
      profits.filter((item) => item.checkoutId === +checkoutID)
    );
  }, [profits, checkoutID]);

  useEffect(() => {
    setCheckoutExpenses(
      expenses.filter((item) => item.checkoutId === +checkoutID)
    );
  }, [expenses, checkoutID]);

  useEffect(() => {
    const name = checkoutNames.find((checkout) => checkout.id === +checkoutID);
    if (name) {
      setCheckoutName(name.name);
    }
  }, [checkoutNames, checkoutID]);

  useEffect(() => {
    const profitsSum = checkoutProfits.reduce(
      (sum, profit) => sum + parseInt(profit.amount, 10),
      0
    );
    setTotalProfits(profitsSum);
  }, [checkoutProfits]);

  useEffect(() => {
    const expensesSum = checkoutExpenses.reduce(
      (sum, expense) => sum + parseInt(expense.amount, 10),
      0
    );
    setTotalExpenses(expensesSum);
  }, [checkoutExpenses]);

  console.log(totalProfits);
  const balance = totalProfits - totalExpenses;
  const balanceVariant = balance >= 0 ? "success" : "danger";

  return (
    <>
      <Container className="mt-3">
        <h1>Checkout Details for {checkoutName}</h1>
      </Container>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h2 className="text-success">Profit History</h2>
            <ListGroup>
              {checkoutProfits.map((profit) => (
                <ListGroup.Item variant="success" key={profit.id}>
                  Profit: {profit.amount}
                </ListGroup.Item>
              ))}
              <Alert variant="success">Total Profits: {totalProfits}</Alert>
            </ListGroup>
          </div>
          <div className="col-md-6">
            <h2 className="text-danger">Expense History</h2>
            <ListGroup>
              {checkoutExpenses.map((expense) => (
                <ListGroup.Item variant="danger" key={expense.id}>
                  Expense: {expense.amount}
                </ListGroup.Item>
              ))}
              <Alert variant="danger">Total Expenses: {totalExpenses}</Alert>
            </ListGroup>
          </div>
          <div className="container mt-3">
            <h2 className={`text-${balanceVariant}`}>Overall Balance</h2>
            <Alert variant={balanceVariant}>Balance: {balance}</Alert>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutDetails;
