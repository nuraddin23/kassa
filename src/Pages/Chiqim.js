import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { addExpense, removeExpense } from "../Redux-Toolkit/expenseSlice"; // Import your corresponding expenseSlice

const Chiqim = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const checkouts = useSelector((state) => state.checkout.names);
  const expenses = useSelector((state) => state.expense.expenses); // Make sure to use your own Redux slice name

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCheckout, setSelectedCheckout] = useState(null);
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");

  const handleAddExpense = () => {
    if (!selectedUser || !selectedCheckout || amount === "" || time === "") {
      return;
    }

    const newExpense = {
      id: expenses.length + 1,
      userId: selectedUser.id,
      checkoutId: selectedCheckout.id,
      amount,
      time,
    };

    dispatch(addExpense(newExpense));

    setSelectedUser(null);
    setSelectedCheckout(null);
    setAmount("");
    setTime("");
    setShowAddExpense(false);
  };

  const handleRemoveExpense = (expenseId) => {
    dispatch(removeExpense(expenseId));
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col md={8}>
          <Container>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h3>Chiqimlar</h3>
                <Button
                  variant="light"
                  className="border-3 border-black"
                  onClick={() => setShowAddExpense(true)}
                >
                  Add
                </Button>
              </Card.Header>

              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Checkout name</th>
                    <th>Time</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, index) => {
                    const user = users.find((u) => u.id === expense.userId);
                    const checkout = checkouts.find(
                      (c) => c.id === expense.checkoutId
                    );

                    return (
                      <tr key={expense.id}>
                        <td>{index + 1}</td>
                        <td>{user ? user.name : "Unknown User"}</td>
                        <td>{expense.amount}</td>
                        <td>{checkout ? checkout.name : "Unknown Checkout"}</td>
                        <td>{expense.time}</td>
                        <td className="d-flex">
                          <Button variant="secondary" className="me-3">
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleRemoveExpense(expense.id)}
                            variant="danger"
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </Container>
        </Col>
        {showAddExpense && (
          <Col md={4}>
            <Card>
              <Card.Header>Chiqim qilish</Card.Header>
              <Card.Body>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="user-dropdown">
                    Choose a User
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {users.map((user) => (
                      <Dropdown.Item
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                      >
                        {user.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="checkout-dropdown">
                    Choose a Checkout
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {checkouts.map((checkout) => (
                      <Dropdown.Item
                        key={checkout.id}
                        onClick={() => setSelectedCheckout(checkout)}
                      >
                        {checkout.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                <Form>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Amount:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Amount..."
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Time:</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder="Time..."
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer>
                <Button variant="secondary" className="me-3">
                  Chiqish
                </Button>
                <Button variant="primary" onClick={handleAddExpense}>
                  Saqlash
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Chiqim;
