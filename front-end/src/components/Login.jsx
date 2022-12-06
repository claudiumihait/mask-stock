import React, { useState, useRef, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import incorrectLogo from '../../src/images/wrong_creditentials.gif';
import succesfulLogo from '../../src/images/succesful.gif';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ password: "", email: "" });
  const [finalStatus, setFinalStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  let timerIdRef = useRef();

  const navigate = useNavigate();
  const handleGoHome = useCallback(() => navigate('/', { replace: true }), [navigate]);

  const setPassword = (pass) => {
    setLoginDetails({ password: pass, email: loginDetails.email });
  };
  const setEmail = (mail) => {
    setLoginDetails({ password: loginDetails.password, email: mail });
  };

  const registerClick = (loginDetails) => {
    fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        let status = data[0].status;
        if (status) {
          setFinalStatus(status);
          timerIdRef.current = setTimeout(() => {
            props.setName(data[0].status);
            handleGoHome();
          }, 3000);
        } else {
          setLogo(incorrectLogo);
          setErrorMsg(true);
          timerIdRef.current = setTimeout(() => { setLogo(loginLogo); setErrorMsg(false); }, 3000);
        };
      });
  };

  return (
    <Col style={{ padding: "0" }} lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }} xs={{ span: 8, offset: 2 }}>
      <Card bg="dark" text="white" style={{ marginTop: "2rem", marginBottom: "2rem", border: "0", paddingTop: "1rem", paddingBottom: "1rem" }} className="d-flex flex-column">
        {finalStatus && <Card.Img src={succesfulLogo} />}
        {!finalStatus &&
          <>
            <div>
              {errorMsg && <p style={{ color: "red" }}>Wrong email or password!</p>}
            </div>
        <Card.Body >
          <Card.Title style={{ textAlign: "center", marginBottom: "2rem" }}>Login Form</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Email</Form.Label>
                <Form.Control onChange={(event) => setEmail(event.target.value)} type="text" placeholder="Enter email" />
              <Form.Text className="text-muted">
                Tell us your email
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" />
              <Form.Text className="text-muted">
                Enter your password
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button onClick={(event) => { event.preventDefault(); registerClick(formData); }} variant="primary" type="submit">
                Register
              </Button>
            </div>
          </Form>
        </Card.Body></>}
      </Card>
    </Col>
  )
}

export default Login
