import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../Redux-Toolkit/userSlice";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPhone, setNewUserPhone] = useState("");

  const handleAddUser = () => {
    if (newUserName.trim() === "") return;

    const newUser = {
      id: users.length + 1,
      name: newUserName,
      phone: newUserPhone,
    };

    dispatch(addUser(newUser));
    setNewUserName("");
    setNewUserPhone("");
    setShowAddUser(false);
  };

  const handleRemoveUser = (id) => {
    dispatch(removeUser(id));
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col md={8}>
          <Container>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h3>Foydalanuvchilar</h3>
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
                    <th>Name</th>
                    <th>Phone</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td className="d-flex">
                        <Button variant="secondary" className="me-3">
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleRemoveUser(user.id)}
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
        {showAddUser && (
          <Col md={4}>
            <Card>
              <Card.Header>Foydalanuvchi qo'shish</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name..."
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                    />
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Phone..."
                      value={newUserPhone}
                      onChange={(e) => setNewUserPhone(e.target.value)}
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

export default Users;
