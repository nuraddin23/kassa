import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { addExpense, removeExpense, editExpense } from "../Redux-Toolkit/expenseSlice";

const Chiqim = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const checkouts = useSelector((state) => state.checkout.names);
  const expenses = useSelector((state) => state.expenses.expenses);

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCheckout, setSelectedCheckout] = useState(null);
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [editingExpenseId, setEditingExpenseId] = useState(null);

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

  const handleEditExpense = () => {
    if (editingExpenseId === null) return;

    const editedExpense = {
      id: editingExpenseId,
      userId: selectedUser.id,
      checkoutId: selectedCheckout.id,
      amount,
      time,
    };

    dispatch(editExpense(editedExpense));
    setEditingExpenseId(null);
  };

  const handleEditClick = (expenseId) => {
    const expenseToEdit = expenses.find((expense) => expense.id === expenseId);
    if (expenseToEdit) {
      setSelectedUser(users.find((user) => user.id === expenseToEdit.userId));
      setSelectedCheckout(checkouts.find((checkout) => checkout.id === expenseToEdit.checkoutId));
      setAmount(expenseToEdit.amount);
      setTime(expenseToEdit.time);
      setEditingExpenseId(expenseId);
    }
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
                    const checkout = checkouts.find((c) => c.id === expense.checkoutId);

                    return (
                      <tr key={expense.id}>
                        <td>{index + 1}</td>
                        <td>{user ? user.name : "Unknown User"}</td>
                        <td>{expense.amount}</td>
                        <td>{checkout ? checkout.name : "Unknown Checkout"}</td>
                        <td>{expense.time}</td>
                        <td className="d-flex">
                          <Button
                            variant="secondary"
                            className="me-3"
                            onClick={() => handleEditClick(expense.id)} // Edit button
                          >
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
        {showAddExpense || editingExpenseId !== null ? (
          <Col md={4}>
            <Card>
              <Card.Header>
                {editingExpenseId !== null ? "Chiqimni tahrirlash" : "Chiqim qilish"}
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="user-dropdown">
                    <Form.Label>Select a User</Form.Label>
                    <Form.Select
                      value={selectedUser ? selectedUser.id : ""}
                      onChange={(e) =>
                        setSelectedUser(users.find((user) => user.id === +e.target.value))
                      }
                    >
                      <option value="">Choose a User</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group className="mb-3" controlId="checkout-dropdown">
                    <Form.Label>Select a Checkout</Form.Label>
                    <Form.Select
                      value={selectedCheckout ? selectedCheckout.id : ""}
                      onChange={(e) =>
                        setSelectedCheckout(
                          checkouts.find((checkout) => checkout.id === +e.target.value)
                        )
                      }
                    >
                      <option value="">Choose a Checkout</option>
                      {checkouts.map((checkout) => (
                        <option key={checkout.id} value={checkout.id}>
                          {checkout.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group className="mb-3" controlId="formGroupAmount">
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
                  <Form.Group className="mb-3" controlId="formGroupTime">
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
                <Button
                  variant="secondary"
                  className="me-3"
                  onClick={() => {
                    setShowAddExpense(false);
                    setEditingExpenseId(null);
                  }}
                >
                  Chiqish
                </Button>
                <Button
                  variant="primary"
                  onClick={
                    editingExpenseId !== null ? handleEditExpense : handleAddExpense
                  }
                >
                  Saqlash
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ) : null}
      </Row>
    </Container>
  );
};

export default Chiqim;
