import { useEffect, useState, useContext } from 'react';
import { Row, Col, Image, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

import { fetchPlaces } from '../apis';
import PlaceForm from '../containers/PlaceForm';
import AuthContext from '../contexts/AuthContext';

import MainLayout from "../layouts/MainLayout";

const Place = styled.div`
   margin-bottom: 20px;
   coursor: pointer;
   transition: all 0.2s;
   :hover {
       transform: scale(1.05);
   }
   > div {
       background-size: cover;
       height: 200px;
       border-radius: 5px;
   }
   > p {
       margin-top: 5px;
       font-size: 20px;
       font-weight: bold;
   }
`

const AddPlaceButton = styled.div`
    border: 1px dashed gray;
    height: 200px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: pointer;
    background-color: white;
    :hover {
        background-color: #fbfbfb;
    }
`

const Places = () => {
    const [places, setPlaces] = useState([]);
    const [show, setShow] = useState(false);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const onHide = () => setShow(false);
    const onShow = () => setShow(true);

    const onFetchPlaces = async () => {
        const json = await fetchPlaces(auth.token);
        if (json) {
            setPlaces(json);
        }
    }

    const onDone = () => {
        onFetchPlaces();
        onHide();
    }

    useEffect(() => {
        onFetchPlaces();
    }, [])

    return (
        <MainLayout>
            <h3>My Places</h3>

            <Modal show={show} onHide={onHide} centered>
                <Modal.Body>
                    <PlaceForm onDone={onDone}/>
                </Modal.Body>
            </Modal>

            <Row>
                {places.map((place) => (
                    <Col key={place.id} lg={4}>
                        <Place onClick={() => navigate(`/places/${place.id}`)} on>
                            <div style={{ backgroundImage: `url(${place.image})`}}>
                            </div>
                            <p>{place.name}</p>
                        </Place>
                    </Col>
                ))}
                <Col lg={4}>
                    <AddPlaceButton onClick={onShow}>
                        Add New Place
                    </AddPlaceButton>
                </Col>
            </Row>
        </MainLayout>   
    )
}

export default Places;