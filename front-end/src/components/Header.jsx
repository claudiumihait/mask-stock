import React from 'react'
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HomeLogo from '../images/home_header.png';
import RegistrationLogo from '../images/register_header.png';
import LoginLogo from '../images/login_header.png';
import { Routes, Route } from 'react-router-dom';

const Header = () => {
    return (
        <Row>
            <Col style={{ padding: "0", width: "100%" }}>
                <Routes>
                    <Route exact path="/" element={<Image fluid src={HomeLogo} alt=""></Image>} />
                    <Route path="/register" element={<Image fluid src={RegistrationLogo} alt=""></Image>} />
                    <Route path="/login" element={<Image fluid src={LoginLogo} alt=""></Image>} />
                </Routes>
                
            </Col>
        </Row>
    )
}

export default Header