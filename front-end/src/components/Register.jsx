import React, { useState, useRef, useCallback } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const checkCredentials = (field, credential, handleMessage) => {
  fetch("http://localhost:9000/api/register", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ [`${field}`]: credential }),
  })
    .then((res) => res.json())
    .then((message) => {
      handleMessage(message.error);
    })
    .catch((e) => console.log(e));
};

const Register = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    username: "",
  });

  const [usernameErrMsg, setUsernameErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");
  // const [messages, setMessagesState] = useState({
  //   password: "Choose a complex password.",
  //   email: " We'll never share your email with anyone else.",
  //   username: "Prefered username.",
  // });
  const [finalStatus, setFinalStatus] = useState(false);
  let timerIdRef = useRef();

  const navigate = useNavigate();
  const handleGoHome = useCallback(
    () => navigate("/", { replace: true }),
    [navigate]
  );

  const usernameChange = async (name) => {
    //console.log(name);
    setFormData({
      username: name,
      email: formData.email,
      password: formData.password,
    });
    checkCredentials("username", name, setUsernameErrMsg);
  };

  const emailChange = (email) => {
    setFormData({
      username: formData.username,
      email: email,
      password: formData.password,
    });
    checkCredentials("email", email, setEmailErrMsg);
  };
  const passwordChange = (password) => {
    setFormData({
      username: formData.username,
      email: formData.email,
      password: password,
    });
  };

  const registerClick = (formData) => {
    if (
      messages.password === "Valid password." &&
      messages.email === "Valid email." &&
      messages.username === "Valid username."
    ) {
      clearTimeout(timerIdRef.current);
      fetch("http://localhost:9000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setFinalStatus(data[0].status);
          timerIdRef.current = setTimeout(() => handleGoHome(), 2000);
        });
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
        <Card.Body>
          <Card.Title style={{ textAlign: "center", marginBottom: "2rem" }}>
            SignUp Form
          </Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={(event) => usernameChange(event.target.value)}
                type="text"
                placeholder="Enter username"
              />
              <Form.Text
                style={{
                  color:
                    formData.username.length > 0
                      ? usernameErrMsg !== "Valid username."
                        ? "red"
                        : "green"
                      : "gray",
                }}
              >
                {usernameErrMsg}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(event) => emailChange(event.target.value)}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text
                style={{
                  color:
                    formData.email.length > 0
                      ? emailErrMsg !== "Valid email."
                        ? "red"
                        : "green"
                      : "gray",
                }}
              >
                {emailErrMsg}
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
                      ? pwdErrMsg !== "Valid password."
                        ? "red"
                        : "green"
                      : "gray",
                }}
              >
                {pwdErrMsg}
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  registerClick(formData);
                }}
                variant="primary"
                type="submit"
              >
                Register
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Register;
