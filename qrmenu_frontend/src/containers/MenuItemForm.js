import {useState, useContext, useRef} from 'react';
import { Button, Form, Popover, Overlay } from 'react-bootstrap';
import { RiPlayListAddFill } from 'react-icons/ri';
import { toast } from 'react-toastify'; 

import { addCategory } from '../apis';
import AuthContext from '../contexts/AuthContext';

export default function MenuItemForm({place, onDone}) {
    const [categoryName, setCategoryName] = useState("");
    const [categoryFormShow, setCategoryformShow] = useState(false);
    const target = useRef(null);

    const [category, setCategory] = useState("");
    const auth = useContext(AuthContext);

    const onAddCategory = async () => {
        const json = await addCategory({ name: categoryName, place: place.id}, auth.token);
        if (json) {
            toast(`Category ${json.name} was created.`, { type: "success"});
            setCategory(json.id);
            setCategoryName("");
            setCategoryformShow(false);
            onDone();
        }
    }

    return (
        <div>
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <div className='d-flex align-items-center'>

                </div>
            </Form.Group>
        </div>
    )
}