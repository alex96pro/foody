import React from 'react';
import Modal from 'react-modal';
import {useForm} from 'react-hook-form';
import './addMealToCart.modal.scss';
Modal.setAppElement('#root'); //for modal error

export default function AddMealToCartModal(props){

    const {register, handleSubmit, errors} = useForm();

    return(
        <Modal isOpen={props.openModal} onRequestClose={props.cancelModal} className="modal-add-to-cart">
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <div><h2>{props.selectedMeal.name}</h2></div>
                <div>Amount</div>
                <input type="number" defaultValue="1" name="amount" ref={register()}></input>
                {errors.amount && <p>Amount is required</p>}
                <div>Aditional info</div>
                <textarea></textarea>
                <div>
                    <button type="submit" className="add-to-cart-modal-button">Add</button>
                    <button className="cancel-cart-modal-button" onClick={props.cancelModal}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
}; 