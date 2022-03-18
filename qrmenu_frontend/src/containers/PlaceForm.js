import React, {useState, useContext} from 'react';
import { Form, Button } from 'react-bootstrap';

import { addPlace } from '../apis';
import AuthContext from '../contexts/AuthContext';

const PlaceForm = ({ onDone }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const auth = useContext(AuthContext);

    const onClick = async () => {
        const json = await addPlace({name, image}, auth.token);
        if (json) {
            setName("");
            setImage("");
            onDone();
        }
    }

  return (
    <div>
       <h4 className='text-center'>Place</h4>
       <Form.Group>
            <Form.Label>name</Form.Label>
            <Form.Control 
                type='text' 
                placefolder='Enter Name' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control 
                type='text' 
                placefolder='Enter URL of Image' 
                value={image} 
                onChange={(e) => setImage(e.target.value)}
            />
        </Form.Group>
        <Button variant='standard' blocck onClick={onClick}>
            Add
        </Button>
    </div>
  )
}

export default PlaceForm