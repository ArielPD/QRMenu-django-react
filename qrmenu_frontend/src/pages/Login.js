import { useState } from 'react'; 
import { Button, Card, Col, Form, Row} from 'react-bootstrap';

import { signIn } from '../apis';
import MainLayout from "../layouts/MainLayout";

export default function Login() {
    const [username, setUserName]=  useState("");
    const [password, setPassword] = useState("");

    const onClick = (e) => {
        e.preventDefault();
        signIn(username, password);
    }
    return (
        <MainLayout>
            <Row className='justify-content-center'>
                <Col lg={6} md={8}>
                    <Card>
                        <Card.Body>
                            <h3 className='text-center'>
                                <b>LOGIN</b>
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
                                <Button variant='standard' block onClick={onClick}>Sign In</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </MainLayout>
    )
} 