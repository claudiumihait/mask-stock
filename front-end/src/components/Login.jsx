import React, { useState, useRef, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import incorrectLogo from '../../src/images/wrong_creditentials.gif';
import succesfulLogo from '../../src/images/succesful.gif';
import loginLogo from '../../src/images/login_logo.png';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [loginDetails, setLoginDetails] = useState({ password: "", email: "" });
  const [finalStatus, setFinalStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [logo, setLogo] = useState(loginLogo);
  const [counter, setCounter] = useState(4);
  let timerIdRef = useRef();

  const successCondition = loginDetails.password.length > 7 && loginDetails.email.match(/(.+)@(.+){2,}/i)

  const navigate = useNavigate();
  const handleGoHome = useCallback(() => navigate('/', { replace: true }), [navigate]);

  const setPassword = (pass) => {
    setLoginDetails({ password: pass, email: loginDetails.email });
  };
  const setEmail = (mail) => {
    setLoginDetails({ password: loginDetails.password, email: mail });
  };

  const loginClick = (loginDetails) => {
    fetch("http://localhost:9000/user/login", {
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
        }
      }).catch((err) => {
        setLogo(incorrectLogo);
        setErrorMsg(true);
        timerIdRef.current = setTimeout(() => { setLogo(loginLogo); setErrorMsg(false); }, 1400);
      });
  };

  return (
    <Col style={{ padding: "0" }} lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }} xs={{ span: 8, offset: 2 }}>
      <Card bg="dark" text="white" style={{ marginTop: "2rem", marginBottom: "2rem", border: "0", paddingTop: "1rem", paddingBottom: "1rem" }} className="d-flex flex-column">
        <Card.Img src={finalStatus ? succesfulLogo : logo} variant="top" style={{ width: "50%", marginLeft: "25%" }} />
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
              <Button onClick={(event) => { event.preventDefault(); loginClick(loginDetails); }} variant="primary" type="submit" disabled={!successCondition}>
                Log In
              </Button>
            </div>
            {finalStatus && <Form.Text
              className="d-flex justify-content-center text-center"
              style={{
                fontSize: "16px",
                color: "white",
                marginTop: "1rem",
              }}
            >
              {"Succesfully logged in! You will be redirected to home page in " + counter + " secs..."}
            </Form.Text>}
            {errorMsg && <Form.Text
              className="d-flex justify-content-center text-center"
              style={{
                fontSize: "16px",
                color: "red",
                marginTop: "1rem",
              }}
            >
                {"Wrong email or password!"}
            </Form.Text>}
          </Form>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Login
