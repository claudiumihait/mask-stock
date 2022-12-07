import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import "../css/NavbarMain.css";

const NavbarMain = (props) => {
  const navigate = useNavigate();
  const handleGoHome = useCallback(() => {
    navigate("/", { replace: true });
    props.setName(false);
  }, [navigate]);
  console.log(props.logged);

  return (
    <Row>
      <Col style={{ padding: "0", width: "100%" }}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand className="d-block d-lg-none">
              MASK-STOCK
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto gap-1 w-100" id="main-nav">
                {!props.logged && (
                  <>
                    <Link to="/register">
                      <Nav.Link eventKey={3} as={Button} size="lg">
                        Registration
                      </Nav.Link>{" "}
                    </Link>
                    <Link to="/login">
                      <Nav.Link eventKey={4} as={Button} size="lg">
                        Login
                      </Nav.Link>{" "}
                    </Link>
                  </>
                )}
                {props.logged && (
                  <>
                    <Link to="/order">
                      <Nav.Link eventKey={1} as={Button} size="lg">
                        Order
                      </Nav.Link>{" "}
                    </Link>
                    <Link to="/add-new">
                      <Nav.Link eventKey={1} as={Button} size="lg">
                        Add hospital
                      </Nav.Link>{" "}
                    </Link>
                    <Nav.Link
                      eventKey={5}
                      as={Button}
                      onClick={() => {
                        fetch("http://localhost:9000/user/logout")
                          .then((response) => response.json())
                          .then((data) => {
                            data[0].status === "succesful"
                              ? handleGoHome()
                              : alert(
                                  `Logout ${data[0].status}. Try again later!`
                                );
                          });
                      }}
                      size="lg"
                    >
                      Logout
                    </Nav.Link>{" "}
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
            {props.logged && (
              <Navbar.Brand
                style={{ fontFamily: "cursive" }}
                className="d-none d-md-block"
              >{`Signed in as ${props.logged}`}</Navbar.Brand>
            )}
          </Container>
        </Navbar>
      </Col>
    </Row>
  );
};

export default NavbarMain;
