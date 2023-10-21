import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import {
  addBenefit,
  removeBenefit,
  editBenefit,
} from "../Redux-Toolkit/benefitSlice";

const Kirim = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const checkouts = useSelector((state) => state.checkout.names);
  const benefits = useSelector((state) => state.benefits.benefits);

  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCheckout, setSelectedCheckout] = useState(null);
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editBenefitId, setEditBenefitId] = useState(null);

  const handleAddUser = () => {
    if (!selectedUser || !selectedCheckout || amount === "" || time === "") {
      return;
    }

    if (editMode && editBenefitId) {
      // If in edit mode, update the existing benefit entry
      dispatch(
        editBenefit({
          id: editBenefitId,
          userId: selectedUser.id,
          checkoutId: selectedCheckout.id,
          amount,
          time,
        })
      );
    } else {
      // Otherwise, add a new benefit entry
      const newBenefit = {
        id: benefits.length + 1,
        userId: selectedUser.id,
        checkoutId: selectedCheckout.id,
        amount,
        time,
      };
      dispatch(addBenefit(newBenefit));
    }

    setSelectedUser(null);
    setSelectedCheckout(null);
    setAmount("");
    setTime("");
    setEditMode(false);
    setEditBenefitId(null);
    setShowAddUser(false);
  };

  const handleEditBenefit = (benefitId) => {
    const benefitToEdit = benefits.find((benefit) => benefit.id === benefitId);
    if (benefitToEdit) {
      setSelectedUser(users.find((user) => user.id === benefitToEdit.userId));
      setSelectedCheckout(
        checkouts.find((checkout) => checkout.id === benefitToEdit.checkoutId)
      );
      setAmount(benefitToEdit.amount);
      setTime(benefitToEdit.time);
      setEditMode(true);
      setEditBenefitId(benefitId);
      setShowAddUser(true);
    }
  };

  const handleRemoveBenefit = (benefitId) => {
    dispatch(removeBenefit(benefitId));
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col md={8}>
          <Container>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h3>Kirimlar</h3>
                <Button
                  variant="light"
                  className="border-3 border-black"
                  onClick={() => {
                    setShowAddUser(true);
                    setEditMode(false);
                    setEditBenefitId(null);
                  }}
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
                  {benefits.map((benefit, index) => {
                    const user = users.find((u) => u.id === benefit.userId);
                    const checkout = checkouts.find(
                      (c) => c.id === benefit.checkoutId
                    );

                    return (
                      <tr key={benefit.id}>
                        <td>{index + 1}</td>
                        <td>{user ? user.name : "Unknown User"}</td>
                        <td>{benefit.amount}</td>
                        <td>{checkout ? checkout.name : "Unknown Checkout"}</td>
                        <td>{benefit.time}</td>
                        <td className="d-flex">
                          <Button
                            variant="secondary"
                            className="me-3"
                            onClick={() => handleEditBenefit(benefit.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pencil"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                          </Button>
                          <Button
                            onClick={() => handleRemoveBenefit(benefit.id)}
                            variant="danger"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>
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
        {showAddUser && (
          <Col md={4}>
            <Card>
              <Card.Header>Kirim qilish</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="user-dropdown">
                    <Form.Label>Select a User</Form.Label>
                    <Form.Select
                      value={selectedUser ? selectedUser.id : ""}
                      onChange={(e) =>
                        setSelectedUser(
                          users.find((user) => user.id === +e.target.value)
                        )
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
                          checkouts.find(
                            (checkout) => checkout.id === +e.target.value
                          )
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
                  onClick={() => setShowAddUser(false)}
                >
                  Chiqish
                </Button>
                <Button variant="primary" onClick={handleAddUser}>
                  {editMode ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-save"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                    </svg>
                  ) : (
                    "Qo'shish"
                  )}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Kirim;
