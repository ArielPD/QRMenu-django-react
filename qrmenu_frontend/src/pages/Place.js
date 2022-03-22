import { useState, useEffect, useContext } from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdArrowBack} from 'react-icons/io';
import styled from 'styled-components';

import { fetchPlace, fetchPlaces } from '../apis';
import AuthContext from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import MenuItemForm from '../containers/MenuItemForm';
import MenuItem from '../components/MenuItem';

const Panel = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 1px 1px 10px rgba(0,0,0,0.05);
`;

const Place = () => {
    const [place, setPlace] = useState({});
    const params = useParams();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const onBack = () => {
        navigate('/places');
    }

    const onFetchPlace = async () => {
       const json = await fetchPlace(params.id, auth.token);
       if (json) {
            setPlace(json);
       }
    }

  useEffect(() => {
    onFetchPlace();
  }, []);
  
  return (
    <MainLayout>
        <Row>
            <Col lg={12}>
                <div className='mb-4'>
                    <div className='d-flix align-items-center'>
                        <Button variant="link" onClick={onBack}>
                            <IoMdArrowBack size={25} color="black"/>
                        </Button>
                        <h3 className='mb-0 ml-2 mr-2'>{place.name}</h3>
                    </div>
                </div>
            </Col>
            <Col md={4}>
                <Panel>
                    <MenuItemForm place={place} onDone={onFetchPlace}/>
                </Panel>
            </Col>
            <Col md={8}>
                {place?.categories?.map((category) => (
                    <div key={category.id} className="mb-5">
                        <h4 className='mb-0 mr-2'>
                            <b>{category.name}</b>
                        </h4>
                        {category?.menu_items.map((item) => (
                            <MenuItem key={item.id} item={item} />
                        ))}
                    </div>
                ))}
                
            </Col>
        </Row>
    </MainLayout>
  )
}

export default Place;