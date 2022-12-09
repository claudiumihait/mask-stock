import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import backgroundLogo1 from '../images/welcome_background1.jpg';
import infoLogo1 from '../images/info_logo1.png';
import infoLogo2 from '../images/info_logo2.png';
import infoLogo3 from '../images/info_logo3.png';   
import HospitalModal from './HospitalModal';
import '../css/Welcome.css';

const Welcome = (props) => {
    let hospitalColumns = ["Address", "Emails", "Taxcode", "Iban", "Swift", "Account Number", "Phone", "Tax Type"]
    const [modalShow, setModalShow] = useState(false);
    const [modalDetails, setModalDetails] = useState({ title: "", columns: hospitalColumns, data: [] });

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    useEffect(() => {
        console.log(props.tableData)
    }, [props.tableData]);

    const tableData = (object, key) => {
        const clickForModal = () => {
            setModalDetails({ title: object["Hospital Name"], columns: hospitalColumns, data: object.data });
            handleShow();
            console.log(modalDetails)
        };

        return <tr key={key} onClick={clickForModal}>
            <td>{object["Hospital Name"]}</td>
            <td>{String(object["Admin"])}</td>
        </tr>
    };

    return (
        <Col id="welcome">
            {/* <HospitalModal show={modalShow} handleClose={handleClose} title={modalDetails.title} columns={modalDetails.columns} data={modalDetails.data} /> */}
            <Container>
                <Row style={{ backgroundImage: `url(${backgroundLogo1})`, paddingTop: "2rem", paddingBottom: "2rem" }}>
                    <Col xs={12} md={{ span: 8, offset: 2 }} lg={{ span: 4, offset: 1 }} style={{ padding: "1rem" }}>
                        <Card style={{backgroundColor:"transparent", border:"0"}}>
                            <Card.Body >
                                {props.tableData.length && <>
                                    <h5 className="text-center"><strong>{`Welcome, ${props.name}!`}</strong></h5>
                                    <h5 className="text-center"><strong>These are your hospitals data</strong></h5>
                                    <Table striped bordered hover variant="dark" responsive className="w-100 my-5">
                                        <thead>
                                            <tr>
                                                {Object.keys(props.tableData[0]).slice(0, 2).map((item, index) => <th key={index}>{item}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.tableData.map((object, index) => tableData(object, index))}
                                        </tbody>
                                    </Table></>}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col className="text-center py-4">
                        <h2><strong>Mask Stock - 24/7 Secure service</strong> </h2>
                        <h4><strong>This is a multi-hospital cross-stocking platform, where users can resupply our partner hospitals, from a selection of medical equipment.</strong> </h4>
                    </Col>
                </Row>
                <Row className="my-2">
                    <Col xs={12} md={12} lg={4} className="d-flex justify-content-center p-4">
                        <Card className="w-75" bg="dark" key="dark" text="white">
                            <Card.Img variant="top" src={infoLogo1} />
                            <Card.Body className="text-center">
                                <Card.Title>Accesible medical equipment</Card.Title>
                                <Card.Text className="mt-4">
                                    The global pandemic has shown us the importance of medical equipment, both for expert personnel, but also for the general public,
                                    who was the most affected. We link you to our biggest provider.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={12} lg={4} className="d-flex justify-content-center p-4">
                        <Card className="w-75" bg="dark" key="dark" text="white">
                            <Card.Img variant="top" src={infoLogo2} />
                            <Card.Body className="text-center">
                                <Card.Title>Professional delivery</Card.Title>
                                <Card.Text className="mt-4">
                                    Our platform is the mind of the operation and the client is the heart. We are linking worldwide medical institutions with excellent
                                    professional services and our item provider. Air, sea, land, you name it, we solve it...
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={12} lg={4} className="d-flex justify-content-center p-4">
                        <Card className="w-75" bg="dark" key="dark" text="white">
                            <Card.Img variant="top" src={infoLogo3} />
                            <Card.Body className="text-center">
                                <Card.Title>Digital invoicing</Card.Title>
                                <Card.Text className="mt-4">
                                    Mask-stocks provides the means to supply multiple hospital partners and each order will always be followed by the proper legal documentation.
                                    Each order will be stored safely in our database.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Col>
    )
}

export default Welcome
