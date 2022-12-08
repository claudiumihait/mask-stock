import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../css/NavbarMain.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { FaUserAlt, FaHeadSideMask } from 'react-icons/fa'

const NavbarMain = (props) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      cookies.remove("jwt");
      navigate("/register");
    } catch (error) {
      alert(
        `Logout failed. Try again later!`
      );
    }
  };

  return <Row>
    <Col style={{ padding: "0", width: "100%" }}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="d-block d-lg-none"><FaHeadSideMask style={{ color: "whitesmoke", marginBottom: "0.2rem", marginRight: "1rem" }} />MASK-STOCK</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto gap-1 w-100" id="main-nav">
              {!props.logged && <>
                <Link to="/register">
                  <Nav.Link eventKey={1} as={Button} size="lg">Registration</Nav.Link>{' '}
                </Link>
                <Link to="/login">
                  <Nav.Link eventKey={2} as={Button} size="lg">Login</Nav.Link>{' '}
                </Link>
              </>}
              {props.logged && <>
                <Link to="/welcome">
                  <Nav.Link eventKey={1} as={Button} size="lg">Home</Nav.Link>{' '}
                </Link>
                <Link to="/order">
                  <Nav.Link eventKey={2} as={Button} size="lg">Order</Nav.Link>{' '}
                </Link>
                <Link to="/add-new">
                  <Nav.Link eventKey={3} as={Button} size="lg">Add Hospital</Nav.Link>{' '}
                </Link>
                <Link >
                  <Nav.Link eventKey={4} as={Button} onClick={(event) => handleLogout()} size="lg">Logout</Nav.Link>{' '}
                </Link>
              </>}
            </Nav>
          </Navbar.Collapse>
          {props.logged && <Navbar.Brand style={{ fontFamily: "Arial" }} className="d-none d-md-block"> <FaUserAlt style={{color:"whitesmoke", marginBottom:"0.2rem", marginRight:"1rem"}} />{`${props.logged}`}</Navbar.Brand>}
        </Container>
      </Navbar>
    </Col>
  </Row>
}

export default NavbarMain