import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { addBenefit, removeBenefit } from "../Redux-Toolkit/benefitSlice";

const Kirim = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const checkouts = useSelector((state) => state.checkout.names);
  const benefits = useSelector((state) => state.benefits.benefits);

  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCheckout, setSelectedCheckout] = useState(null);
  const [amout, setAmout] = useState("");
  const [time, setTime] = useState("");

  const handleAddUser = () => {
    if (!selectedUser || !selectedCheckout || amout === "" || time === "") {
      return;
    }

    const newBenefit = {
      id: benefits.length + 1,
      userId: selectedUser.id,
      checkoutId: selectedCheckout.id,
      amout,
      time,
    };

    dispatch(addBenefit(newBenefit));

    setSelectedUser(null);
    setSelectedCheckout(null);
    setAmout("");
    setTime("");
    setShowAddUser(false);
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
                  onClick={() => setShowAddUser(true)}
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
                        <td>{benefit.amout}</td>
                        <td>{checkout ? checkout.name : "Unknown Checkout"}</td>
                        <td>{benefit.time}</td>
                        <td className="d-flex">
                          <Button variant="secondary" className="me-3">
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleRemoveBenefit(benefit.id)}
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
        {showAddUser && (
          <Col md={4}>
            <Card>
              <Card.Header>Kirim qilish</Card.Header>
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
                      value={amout}
                      onChange={(e) => setAmout(e.target.value)}
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
                <Button variant="primary" onClick={handleAddUser}>
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

export default Kirim;
