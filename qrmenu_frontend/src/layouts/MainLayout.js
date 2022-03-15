import {Navbar, Nav, Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
    const navigate = useNavigate();
    const onsignIn = () => {
        navigate('/login');
    }
  return (
     <>
        <Navbar bg="light" variant="light" className='mb-4'>
            <Navbar.Brand href="/">QR MENU</Navbar.Brand>
            <Nav className="flex-grow-1 justify-content-end">
                <Nav.Link onClick={onsignIn}>Login</Nav.Link>
            </Nav>
        </Navbar>
        <Container>
            {children}
        </Container>
    </> 
  )
}

export default MainLayout;