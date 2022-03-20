import { useState, useEffect, useContext } from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdArrowBack} from 'react-icons/io'

import { fetchPlace, fetchPlaces } from '../apis';
import AuthContext from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';

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
            <Col log={12}>
                <div className='mb-4'>
                    <div className='d-flix align-items-center'>
                        <Button variant="link" onClick={onBack}>
                            <IoMdArrowBack size={25} color="black"/>
                        </Button>
                        <h3 className='mb-0 ml-2 mr-2'>{place.name}</h3>
                    </div>
                </div>
            </Col>
        </Row>
    </MainLayout>
  )
}

export default Place;