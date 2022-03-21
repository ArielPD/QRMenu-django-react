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
                    <Form.Control as="select" value={category} onChange={e => setCategory(e.target.value)}>
                        <option />
                        {place?.categories?.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Control>
                    
                    <Button  ref={target} variant="link" onClick={() => setCategoryformShow(true)}>
                        <RiPlayListAddFill size={25}/>
                    </Button>

                    <Overlay 
                        show={categoryFormShow} 
                        target={target.current} 
                        placement="bottom" 
                        rootClose 
                        onHide={() => setCategoryformShow(false)}
                    >
                        <Popover id='popover-contained'>
                            <Popover.Header as="h3">Category</Popover.Header>
                            <Popover.Body>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Category Name"
                                        value={categoryName}
                                        onChange={ e => setCategoryName(e.target.value)}
                                    />
                                    <Button variant="standard" style={{width:'100%', marginTop: '5px'}} onClick={onAddCategory}>
                                        Add Category
                                    </Button>
                                </Form.Group>
                            </Popover.Body>
                        </Popover>
                    </Overlay>
                </div>
            </Form.Group>
        </div>
    )
}