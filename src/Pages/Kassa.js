import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import {
  addCheckoutName,
  removeCheckoutName,
} from "../Redux-Toolkit/checkoutSlice";
import { Link } from "react-router-dom";

const Kassa = () => {
  const dispatch = useDispatch();
  const checkoutNames = useSelector((state) => state.checkout.names);

  const [showAddCheckout, setShowAddCheckout] = useState(false);
  const [newCheckoutName, setNewCheckoutName] = useState("");

  const handleAddCheckout = () => {
    if (newCheckoutName.trim() === "") return;
    setShowAddCheckout(false);

    dispatch(addCheckoutName(newCheckoutName));
    setNewCheckoutName("");
  };

  const handleRemoveCheckout = (id) => {
    dispatch(removeCheckoutName(id));
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col md={8}>
          <Container>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h3>Kassa</h3>
                <Button
                  variant="light"
                  className="border-3 border-black"
                  onClick={() => setShowAddCheckout(true)}
                >
                  Add
                </Button>
              </Card.Header>

              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Checkout</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {checkoutNames.map((checkout, index) => (
                    <tr key={checkout.id}>
                      <td>{index + 1}</td>
                      <td>{checkout.name}</td>
                      <td className="d-flex">
                        <Link
                          to={`/checkout/${checkout.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button variant="secondary" className="me-3">
                            See Details
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleRemoveCheckout(checkout.id)}
                          variant="danger"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Container>
        </Col>
        {showAddCheckout && (
          <Col md={4}>
            <Card>
              <Card.Header>Kassa qo'shish</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Kassani kiriting:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Kassa..."
                      value={newCheckoutName}
                      onChange={(e) => setNewCheckoutName(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer>
                <Button variant="secondary" className="me-3">
                  Chiqish
                </Button>
                <Button variant="primary" onClick={handleAddCheckout}>
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

export default Kassa;
