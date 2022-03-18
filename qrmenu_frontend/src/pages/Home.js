import { useNavigate } from 'react-router';
import {Button, Jumbotron, Container, Row, Col, Image, Box } from 'react-bootstrap';
import MainLayout from "../layouts/MainLayout";

const Home = () => {

    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="container-fluid bg-light text-dark p-5 bg-light">
                <div className="container bg-light p-5">
                <Container>
                    <Row>
                        <Col md={6} clasName="my-auto">
                            <h1><b>QR Code Menu</b></h1>
                            <h5>
                                A smart way to share your digital menu in a QR Code with your customers
                            </h5>
                            <br/>
                            <Button onClick={() => navigate('/places')} variant="standard" size='lg'> 
                                Create Your Menu
                            </Button>
                        </Col>
                        <Col md={6}>
                            <Image src="https://assets.materialup.com/uploads/ae60e834-349c-4c94-8189-2450f09ad37a/preview.gif" rounded fluid />
                        </Col>
                    </Row>
                </Container>
                </div>
            </div>
        </MainLayout>   
    )
}

export default Home;