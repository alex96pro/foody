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
                <div className="modal-add-to-cart-header">
                    {props.selectedMeal.name}
                </div>
                <div className="modal-add-to-cart-body">
                    Amount
                    <input type="number" defaultValue="1" name="amount" ref={register()}></input>
                    {errors.amount && <p>Amount is required</p>}
                    <div>Aditional info</div>
                    <textarea></textarea>
                </div>
                <div className="modal-add-to-cart-footer">
                     <button type="submit" className="modal-add-to-cart-button">Add</button>
                    <button className="modal-add-to-cart-cancel-button" onClick={props.cancelModal}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
}; 