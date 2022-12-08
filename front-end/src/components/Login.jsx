import React, { useState, useCallback, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import incorrectLogo from "../../src/images/wrong_creditentials.gif";
import succesfulLogo from "../../src/images/succesful.gif";
import loginLogo from "../../src/images/login_logo.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Login = () => {
  let timerIdRef = useRef();
  const cookies = new Cookies();

  const [loginDetails, setLoginDetails] = useState({ password: "", email: "" });
  const [logo, setLogo] = useState(loginLogo);
  const [succesfulCondition, setSuccesfulCondition] = useState(false);
  const [showError, setShowError] = useState(false)

  const navigate = useNavigate();
  const handleGoHome = useCallback(() => navigate('/', { replace: true }), [navigate]);

  const successCondition =
    loginDetails.password.length > 7 &&
    loginDetails.email.match(/(.+)@(.+){2,}/i);

  const setPassword = (pass) =>
    setLoginDetails({ password: pass, email: loginDetails.email });

  const setEmail = (mail) =>
    setLoginDetails({ password: loginDetails.password, email: mail });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    try {
      fetch("http://localhost:9000/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      }).then((response) => response.json()).then((data) => {
        if (data.error) {
          setLogo(incorrectLogo);
          setShowError(true);
          clearTimeout(timerIdRef.current);
          timerIdRef.current = setTimeout(() => {
            setLogo(loginLogo);
            setShowError(false);
          }, 1500);
        } else {
          cookies.set("jwt", data.token, { maxAge: data.maxAge, secure: true });
          setLogo(succesfulLogo);
          setSuccesfulCondition(true);
          clearTimeout(timerIdRef.current);
          timerIdRef.current = setTimeout(() => {
            handleGoHome();
          }, 3000);
        }
      }).catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }

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
          src={logo}
          variant="top"
          style={{ width: "50%", marginLeft: "25%" }}
        />
        <Card.Body>
          <Card.Title style={{ textAlign: "center", marginBottom: "2rem" }}>
            Login Form
          </Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={(event) => setEmail(event.target.value)}
                type="text"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">Tell us your email</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
              />
              <Form.Text className="text-muted">Enter your password</Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                onClick={(event) => formSubmitHandler(event)}
                variant="primary"
                type="submit"
                disabled={!successCondition}>
                Sign in
              </Button>
            </div>
            {!succesfulCondition && <Form.Text
              className="d-flex justify-content-center text-center"
              style={{
                fontSize: "16px",
                color: "white",
                marginTop: "1rem",
              }}>
              Don't have an account? <Link to="/register">Register</Link>
            </Form.Text>}
            {succesfulCondition && <Form.Text
              className="d-flex justify-content-center text-center"
              style={{
                fontSize: "16px",
                color: "white",
                marginTop: "1rem",
              }}>
              Sign in succesful! Redirecting you to home page.
            </Form.Text>}
            {showError && <Form.Text
              className="d-flex justify-content-center text-center"
              style={{
                fontSize: "16px",
                color: "red",
                marginTop: "1rem",
              }}>
              Wrong credentials! Please try again.
            </Form.Text>}
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Login;