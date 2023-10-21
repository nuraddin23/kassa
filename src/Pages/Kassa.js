import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import {
  addCheckoutName,
  removeCheckoutName,
  editCheckoutName, // Import the new action
} from "../Redux-Toolkit/checkoutSlice";
import { Link } from "react-router-dom";

const Kassa = () => {
  const dispatch = useDispatch();
  const checkoutNames = useSelector((state) => state.checkout.names);

  const [showAddCheckout, setShowAddCheckout] = useState(false);
  const [newCheckoutName, setNewCheckoutName] = useState("");

  // New state variables to handle editing
  const [editingCheckoutId, setEditingCheckoutId] = useState(null);
  const [editedCheckoutName, setEditedCheckoutName] = useState("");

  const handleAddCheckout = () => {
    if (newCheckoutName.trim() === "") return;
    setShowAddCheckout(false);

    dispatch(addCheckoutName(newCheckoutName));
    setNewCheckoutName("");
  };

  const handleEditCheckout = (checkout) => {
    setEditingCheckoutId(checkout.id);
    setEditedCheckoutName(checkout.name);
  };

  const handleSaveEdit = () => {
    if (editedCheckoutName.trim() === "") return;

    dispatch(
      editCheckoutName({ id: editingCheckoutId, name: editedCheckoutName })
    );

    // Clear the editing state
    setEditingCheckoutId(null);
    setEditedCheckoutName("");
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
                      <td>
                        {editingCheckoutId === checkout.id ? (
                          <Form.Control
                            type="text"
                            value={editedCheckoutName}
                            onChange={(e) =>
                              setEditedCheckoutName(e.target.value)
                            }
                          />
                        ) : (
                          checkout.name
                        )}
                      </td>
                      <td className="d-flex">
                        {editingCheckoutId === checkout.id ? (
                          <Button
                            variant="primary"
                            onClick={handleSaveEdit}
                            className="me-3"
                          >
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
                          </Button>
                        ) : (
                          <Button
                            variant="secondary"
                            onClick={() => handleEditCheckout(checkout)}
                            className="me-3"
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
                        )}
                        <Link
                          to={`/checkout/${checkout.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button variant="secondary" className="me-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-eye"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>{" "}
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleRemoveCheckout(checkout.id)}
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
