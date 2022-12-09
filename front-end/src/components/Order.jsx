import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import {useState, useEffect}  from 'react';
import Cookies from 'universal-cookie';

const Order = () => {
    const [order, setOrder] = useState({
        hospital: "",
        product: "",
        quantity: 0
    })

    const [stocks, setStocks] = useState(null)
    const [error, setError] = useState("")
    const [jobs, setJobs] = useState(null)
    const [userName, setUserName] = useState(null)

    const getStock = async()=>{
        const response = await fetch("http://localhost:9000/stocks")

        const stocks = await response.json()

        if(stocks)setStocks(stocks)

        return stocks
    }

    const getHospitals = async(userName) => {
        const response = await fetch("http://localhost:9000/jobs",{
            method: "POST",
            credentials:"include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userName})
        })
        let raspuns = await response.json()
        if(response.ok){
            setJobs(raspuns)
        }
    }

    const isAuth = async()=>{
        const cookies = new Cookies();
        const jwtCookie = cookies.get("jwt");

        const response = await fetch("http://localhost:9000/user/auth", {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: jwtCookie })
        });
        const data = await response.json();
        setUserName(data.user)

        getHospitals(data.user)
    }

    useEffect(()=>{
        isAuth()
    },[])

    useEffect(()=>{
        getStock()
    },[order])

    const sendOrder = async(e) => {
        e.preventDefault();

        if(order.hospital && order.product && (parseInt(order.quantity) > 0 && order.quantity))
            {
            const response = await fetch("http://localhost:9000/order",{
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(order)
            })
            
            if(response.ok){
                window.location = "http://localhost:9000/downloadInvoice"
            }
        }else{
            setError("All field must be filled!")
            setTimeout(()=>{
                setError("")
            },3000)
        }
        setOrder({
            hospital: "",
            product: "",
            quantity: 0
        })
        getStock()
    }

    return ( 
        <Container fluid >
            <Row>
                <Col className="text-center">
                    <h1>Place orders</h1>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col sm={6} md={6} lg={6}>
                    <Card bg="dark" text="white">
                        <Card.Img variant="top" src="https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg" />
                        <Card.Body>
                            <Card.Title>Place orders</Card.Title>
                            {stocks&&
                                stocks.map((prod,i)=><Card.Subtitle key={i} className="mb-2 text-muted">{`${prod.name} : ${prod.qty.toLocaleString()}`}</Card.Subtitle>)
                            }
                            <Form className="d-flex justify-content-center flex-column">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Hospital: </InputGroup.Text>
                                    <Form.Select aria-label="Default select example" value={order.hospital} onChange={(e)=>setOrder({...order, hospital:e.target.value})}>
                                        <option>Select a hospital</option>
                                        {jobs&&
                                            jobs.map((hospital,i)=><option key={i}>{`${hospital.name}`}</option>)
                                        }
                                    </Form.Select>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Product: </InputGroup.Text>
                                    <Form.Select aria-label="Default select example" value={order.product} onChange={(e)=>setOrder({...order, product: e.target.value})}>
                                        <option>Select product...</option>
                                        {stocks&&
                                            stocks.map((prod,i)=><option key={i} >{`${prod.name}`}</option>)}
                                    </Form.Select>
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Quantity:</InputGroup.Text>
                                    <Form.Control value ={order.quantity} type="number" placeholder="123" onChange={(e)=>setOrder({...order, quantity:e.target.value})}/>
                                </InputGroup>

                                {error&&<h2 id="err" className="text-center">{error}</h2>}
                                <Button variant="primary" type="submit" onClick={(e)=>sendOrder(e)}>
                                    Place order
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Order;