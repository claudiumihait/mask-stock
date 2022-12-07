import React, { useState, useRef, useCallback } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import registerLogo from "../../src/images/register_logo.png";
import succesfulLogo from "../../src/images/succesful.gif";
import { useEffect } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    username: "",
  });
  const [messages, setMessagesState] = useState({
    password: "Choose a complex password.",
    email: " We'll never share your email with anyone else.",
    username: "Prefered username.",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [counter, setCounter] = useState(4);

  const navigate = useNavigate();
  const successCondition =
    messages.password === "Valid password." &&
    messages.email === "Valid email." &&
    messages.username === "Valid username.";

  useEffect(() => {
    if (successMessage) setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) navigate("/login");
  }, [counter]);

  const checkCredential = (field, credential) => {
    field === "username"
      ? setFormData({
        username: credential,
        email: formData.email,
        password: formData.password,
      })
      : setFormData({
        username: formData.username,
        email: credential,
        password: formData.password,
      });
    fetch("http://localhost:9000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [field]: credential }),
    })
      .then((response) => response.json())
      .then((data) =>
        field === "username"
          ? setMessagesState({
            password: messages.password,
            email: messages.email,
            username: data[0].message,
          })
          : setMessagesState({
            password: messages.password,
            email: data[0].message,
            username: messages.username,
          })
      );
  };

  const passwordChange = (password) => {
    password.length < 7
      ? setMessagesState({
        password: "Password too short.",
        email: messages.email,
        username: messages.username,
      })
      : setMessagesState({
        password: "Valid password.",
        email: messages.email,
        username: messages.username,
      });
    setFormData({
      username: formData.username,
      email: formData.email,
      password: password,
    });
  };

  const registerClick = (e, formData) => {
    e.preventDefault();
    if (successCondition) {
      fetch("http://localhost:9000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .catch((e) => console.log(e));
      setSuccessMessage(
        "Succesfully registered! You will be redirected to login page in "
      );
      setCounter(3);
    }
  };

  return (
    <Col
      style={{ padding: "0" }}
      lg={{ span: 4, offset: 4 }}
      md={{ span: 6, offset: 3 }}
      xs={{ span: 8, offset: 2 }}
    >
      <Card
        bg="dark"
        text="white"
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          border: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
        className="d-flex flex-column"
      >
        <Card.Img
          variant="top"
          src={successCondition ? succesfulLogo : registerLogo}
          style={{ width: "50%", marginLeft: "25%" }}
        />
        <Card.Body>
          <Card.Title style={{ textAlign: "center", marginBottom: "2rem" }}>
            SignUp Form
          </Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={(event) =>
                  checkCredential("username", event.target.value)
                }
                type="text"
                placeholder="Enter username"
              />
              <Form.Text
                style={{
                  color:
                    formData.username.length > 0
                      ? messages.username !== "Valid username."
                        ? "red"
                        : "green"
                      : "gray",
                }}
              >
                {messages.username}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(event) =>
                  checkCredential("email", event.target.value)
                }
                type="email"
                placeholder="Enter email"
              />
              <Form.Text
                style={{
                  color:
                    formData.email.length > 0
                      ? messages.email !== "Valid email."
                        ? "red"
                        : "green"
                      : "gray",
                }}
              >
                {messages.email}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(event) => passwordChange(event.target.value)}
                type="password"
                placeholder="Password"
              />
              <Form.Text
                style={{
                  color:
                    formData.password.length > 0
                      ? messages.password !== "Valid password."
                        ? "red"
                        : "green"
                      : "gray",
                }}
              >
                {messages.password}
              </Form.Text>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button
                style={{ marginTop: "1rem" }}
                disabled={!successCondition}
                onClick={(e) => registerClick(e, formData)}
                variant="primary"
                type="submit"
              >
                Register
              </Button>
            </div>
            <Form.Text
              className="d-flex justify-content-center text-center"
              style={{
                fontSize: "16px",
                color: "white",
                marginTop: "1rem",
              }}
            >
              {successMessage ? successMessage + counter + " secs..." : ""}
            </Form.Text>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Register;