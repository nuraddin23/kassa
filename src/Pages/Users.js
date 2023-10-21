import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser, editUser } from "../Redux-Toolkit/userSlice";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPhone, setNewUserPhone] = useState("");

  const [editUserId, setEditUserId] = useState(null); // Track which user is being edited
  const [editUserName, setEditUserName] = useState("");
  const [editUserPhone, setEditUserPhone] = useState("");

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

  const handleEditUser = (id) => {
    setEditUserId(id); // Set the user being edited
    const user = users.find((u) => u.id === id);
    if (user) {
      setEditUserName(user.name);
      setEditUserPhone(user.phone);
    }
  };

  const handleSaveEditUser = () => {
    if (editUserId === null) return; // No user being edited

    // Dispatch the editUser action with updated information
    dispatch(
      editUser({
        id: editUserId,
        name: editUserName,
        phone: editUserPhone,
      })
    );

    setEditUserId(null); // Reset the user being edited
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
                      <td>
                        {editUserId === user.id ? (
                          <Form.Control
                            type="text"
                            value={editUserName}
                            onChange={(e) => setEditUserName(e.target.value)}
                          />
                        ) : (
                          user.name
                        )}
                      </td>
                      <td>
                        {editUserId === user.id ? (
                          <Form.Control
                            type="number"
                            value={editUserPhone}
                            onChange={(e) => setEditUserPhone(e.target.value)}
                          />
                        ) : (
                          user.phone
                        )}
                      </td>
                      <td className="d-flex">
                        {editUserId === user.id ? (
                          <Button
                            variant="primary"
                            className="me-2"
                            onClick={handleSaveEditUser}
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
                            className="me-2"
                            onClick={() => handleEditUser(user.id)}
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
                          to={`/user/${user.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button variant="secondary" className="me-2">
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
                          onClick={() => handleRemoveUser(user.id)}
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
