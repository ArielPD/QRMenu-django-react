import React from 'react';
import { Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai'
 
const Container = styled.div`
    background-color: white ;
    border-radius: 5px;
    margin-bottom: 30px;
    box-shadow: 1px 1px  8px rgba(0,0,0,0.1)
    //display: flex;
    opacity: ${({active}) => (active ? 1: 0.6)};
    > div:first-child {
        //width: 40%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background-size: cover;
    }
    > div:last-child {
      padding: 15px 20px;
      min-height: 150px;
    }
`;

const MenuItem = ({ item, onEdit, onRemove }) => {
  return (
    <Container active={item.is_available} style={{ display: 'flex'}}>
      <Col xs={5} style={{ backgroundImage: `url(${item.image})`, height: '150px', width: '40%'}} />
      <Col xs={7} className="d-flex flex-column justify-content-between">
         <div>
           <div  className="d-flex justify-content-between align-items-center mb-2">
              <h4 className='mb-2'><b>{item.name}</b></h4>
              <div>
                { onEdit ? (
                  <Button variant="link" onClick={onEdit}>
                    <BiEdit size={20} />
                  </Button>
                ) : null}
                { onRemove ? (
                  <Button variant="link" onClick={onRemove}>
                    <AiOutlineDelete size={20} color="red"/>
                  </Button>
                ) : null}
              </div>
           </div>
           <p>{item.description}</p>
         </div>
         <div className="d-flex justify-content-between align-items-end">
          <div>
            <h5 className="mb-0 text-standard">
              <b>$ {item.price}</b>
            </h5>
          </div>
          {!item.is_available ? (<small className="text-secondary">Not Available</small>) : null}
         </div>
       </Col>
    </Container>
  )
}

export default MenuItem