import React from 'react';
import {useForm} from 'react-hook-form';
import './editMealModal.scss';
import {useState} from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function EditMealModal(props){

    const {register, handleSubmit, errors} = useForm();
    const [state, setState] = useState(props.meal);
    const handleChange = (event) => {
        setState({...state, [event.target.name]:event.target.value});
    };
    return (
        <Modal isOpen={props.showEditModal} onRequestClose={props.closeEditModal} className="modal-edit-meal">
          <div className="modal-edit-meal-header">
            Edit meal
          </div>
          <form onSubmit={handleSubmit(props.onSubmitEdit)}>
              <div className="modal-edit-meal-body">
                  <div>Name
                      <input value={state.name} onChange={handleChange} name="name" ref={register()}/>
                      {errors.name && <p>Name is required</p>}
                  </div>
                  <div>Description
                      <textarea value={state.description} onChange={handleChange} name="description" ref={register()}/>
                      {errors.description && <p>Description is required</p>}
                  </div>
                  <div>Price
                      <input value={state.price} onChange={handleChange} name="price" type="number" ref={register()}/>
                      {errors.price && <p>Price is required</p>}
                  </div>   
              </div>
              <div className="modal-edit-meal-footer">
                  <button type="submit" className="modal-edit-meal-button">Confirm</button>
                  <button onClick={props.closeEditModal} className="modal-edit-meal-cancel-button">Cancel</button>
              </div>
          </form>     
         </Modal>  
    );
};

