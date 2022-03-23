import {useState, useContext, useRef} from 'react';
import { Button, Form, Popover, Overlay } from 'react-bootstrap';
import { RiPlayListAddFill } from 'react-icons/ri';
import { toast } from 'react-toastify'; 

import { addCategory, addMenuItems, updateMenuItem } from '../apis';
import AuthContext from '../contexts/AuthContext';
import ImageDropzone from './ImageDropzone';

export default function MenuItemForm({place, onDone, item = {} }) {
    const [categoryName, setCategoryName] = useState("");
    const [categoryFormShow, setCategoryformShow] = useState(false);
    const target = useRef(null);

    const [category, setCategory] = useState(item.category);
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price || 0);
    const [description, setDescription] = useState(item.description);
    const [image, setImage] = useState(item.image);
    const [isAvailable, setIsAvailable] = useState(
        item.is_available === undefined ? true : !!item.is_available
    );

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

    const onAddMenuItems = async () => {
        const json = await addMenuItems({
            place: place.id,
            category,
            name,
            price,
            description,
            image,
            is_available: isAvailable
        }, auth.token);

        if (json) {
            toast(`Menu Item ${json.name} was created`, {type: "success"});
            setCategory("");
            setName("");
            setPrice(0);
            setDescription("");
            setImage("");
            setIsAvailable(true);
            onDone();
        }
    }

    const onUpdateMenuItem = async () => {
        const json = await updateMenuItem(
            item.id,
            {
                place: place.id,
                category,
                name,
                price,
                description,
                image,
                is_available: isAvailable
            },
            auth.token
        );

        if (json) {
            toast(`Menu Item ${json.name}  was updated`, {type: "success"});
            setCategory("");
            setName("");
            setPrice(0);
            setDescription("");
            setImage("");
            setIsAvailable(false);
            onDone();
        }
    }

    return (
        <div>
            {/* CATEGORIES FORM */}
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

            {/* MENU ITEMS FORM */}
            <Form.Group style={{marginTop:'5px'}}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group style={{marginTop:'5px'}}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </Form.Group>
            <Form.Group style={{marginTop:'5px'}}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group style={{marginTop:'5px'}}>
                <Form.Label>Image</Form.Label>
                <ImageDropzone value={image} onChange={setImage} />
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    label="Is available?"
                    checked={isAvailable}
                    onChange={e => setIsAvailable(e.target.checked)}
                />
            </Form.Group>
            <Button 
                variant="standard"
                style={{width: "100%"}} 
                onClick={ item.id ? onUpdateMenuItem : onAddMenuItems}
            >
               {item.id ? "Update Menu Item" : "+ Add Menu Item"} 
            </Button>
        </div>
    )
}