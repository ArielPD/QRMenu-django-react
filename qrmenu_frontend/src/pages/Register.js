import { useState, useEffect, useContext} from 'react'; 
import { Button, Card, Col, Form, Row, Spinner} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import MainLayout from "../layouts/MainLayout";
import AuthContext from '../contexts/AuthContext';

export default function Register() {
    const [username, setUserName]=  useState("");
    const [password, setPassword] = useState("");

    const auth = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (auth.token) {
            navigate('/places');
        }
    },[auth, navigate])

    const onClick = (e) => {
        e.preventDefault();
        auth.register(username, password, () => navigate('/login'));
    }
    return (
        <MainLayout>
            <Row className='justify-content-center'>
                <Col lg={6} md={8}>
                    <Card>
                        <Card.Body>
                            <h3 className='text-center'>
                                <b>REGISTER</b>
                            </h3>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    placefolder='Enter Username' 
                                    value={username} 
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type='password' 
                                    placefolder='Enter Password' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <div className="d-grid gap-2 mt-3">
                                <Button variant='standard' onClick={onClick} disabled={auth.loading}>
                                    {auth.loading? (
                                        <Spinner 
                                            variant="standard"
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        "Register"
                                    )}
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </MainLayout>
    )
} 