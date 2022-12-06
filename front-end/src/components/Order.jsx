import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import {useState, useEffect}  from 'react';


const Order = () => {

    const [order, setOrder] = useState({
        hospital: "",
        product: "",
        quantity: 0
    })

    const [stocks, setStocks] = useState(null)

    const getStock = async()=>{
        const response = await fetch("http://localhost:9000/stocks")

        const stocks = await response.json()

        if(stocks)setStocks(stocks)

        return stocks
    }

    useEffect(()=>{
        console.log(order)
        getStock()
    },[order])


    const sendOrder = async(e) => {
        // e.preventDefault();

        if(order.hospital && order.product && (parseInt(order.quantity) > 0 && order.quantity))
            {
            const response = await fetch("http://localhost:9000/order",{
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(order)
            })
            const json = await response.json()
            console.log(json)
        }else{
            alert("all field must be filled")
        }
    }

    return ( 
        <Container fluid id="order">
            <Row>
                <Col lg={{ span: 8, offset: 5 }}>
                    <h1>Place orders</h1>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 8, offset: 4 }}>
                    <Card style={{ width: '25rem' }}>
                        <Card.Img variant="top" src="https://w7.pngwing.com/pngs/531/816/png-transparent-hospital-patient-free-content-s-building-center-logo-cartoon-website.png" />
                        <Card.Body>
                            <Card.Title>Place orders</Card.Title>
                            {stocks&&
                                stocks.map((prod,i)=><Card.Subtitle key={i} className="mb-2 text-muted">{`${prod.name} : ${prod.qty.toLocaleString()}`}</Card.Subtitle>)
                            }
                            <Form className="d-flex justify-content-center flex-column">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Hospital: </InputGroup.Text>
                                    <Form.Select aria-label="Default select example" onChange={(e)=>setOrder({...order, hospital:e.target.value})}>
                                        <option>Select a hospital</option>
                                        <option value="Pécsi Irgalmasrendi Kórház">Pécsi Irgalmasrendi Kórház</option>
                                        <option value="Miskolci Semmelweis Ignác Egészségügyi Központ és Egyetemi Oktatókórház">Miskolci Semmelweis Ignác Egészségügyi Központ és Egyetemi Oktatókórház</option>
                                        <option value="Szent Pantaleon Kórház Kht">Szent Pantaleon Kórház Kht</option>
                                    </Form.Select>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Product: </InputGroup.Text>
                                    <Form.Select aria-label="Default select example" onChange={(e)=>setOrder({...order, product: e.target.value})}>
                                        <option>Select product...</option>
                                        {stocks&&
                                            stocks.map((prod,i)=><option key={i} value={prod.name}>{`${prod.name}`}</option>)}
                                    </Form.Select>
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Quantity:</InputGroup.Text>
                                    <Form.Control type="number" placeholder="123" onChange={(e)=>setOrder({...order, quantity:e.target.value})}/>
                                </InputGroup>

                            
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