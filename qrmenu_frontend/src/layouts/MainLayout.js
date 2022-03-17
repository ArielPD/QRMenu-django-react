import {useContext} from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

const MainLayout = ({ children }) => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    
    const onsignIn = () => {
        navigate('/login');
    }

    const onSignOut = () => {
        auth.signUserOut();
        navigate('/login');
    }

    const goToPlaces = () => {
        navigate('/places');
    }
  return (
     <>
        <Navbar bg="light" variant="light" className='mb-4'>
            <Navbar.Brand href="/">QR MENU</Navbar.Brand>
            <Nav>
                <Nav.Link onClick={goToPlaces}>Places</Nav.Link>
            </Nav>
            <Nav className="flex-grow-1 justify-content-end">
                {auth.token ? (
                    <Nav.Link onClick={onSignOut}>Logout</Nav.Link>
                ) : (
                    <Nav.Link onClick={onsignIn}>Login</Nav.Link>
                )}
                
            </Nav>
        </Navbar>
        <Container>
            {children}
        </Container>
    </> 
  )
}

export default MainLayout;