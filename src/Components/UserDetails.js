import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";

const UserDetails = () => {
  const { userID } = useParams(); // Capture user ID from the route

  const profits = useSelector((state) => state.benefits.benefits);
  const expenses = useSelector((state) => state.expenses.expenses);
  const users = useSelector((state) => state.user.users);

  const [userProfits, setUserProfits] = useState([]);
  const [userExpenses, setUserExpenses] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Find the user by ID and set their name
    const user = users.find((u) => u.id === +userID);
    if (user) {
      setUserName(user.name);
    }
  }, [userID, users]);

  useEffect(() => {
    // Filter profits for the specific user
    setUserProfits(profits.filter((profit) => profit.userId === +userID));
  }, [profits, userID]);

  useEffect(() => {
    // Filter expenses for the specific user
    setUserExpenses(expenses.filter((expense) => expense.userId === +userID));
  }, [expenses, userID]);

  console.log("userProfits", userProfits);
  console.log("userExpenses", userExpenses);
  console.log("userName", userName);
  return (
    <div className="container mt-5">
      <h1>Details for {userName}</h1>
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-success">Profit History</h2>
          <ListGroup>
            {userProfits.map((profit) => (
              <ListGroup.Item variant="success" key={profit.id}>
                Profit: {profit.amount}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="col-md-6">
          <h2 className="text-danger">Expense History</h2>
          <ListGroup>
            {userExpenses.map((expense) => (
              <ListGroup.Item variant="danger" key={expense.id}>
                Expense: {expense.amount}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
