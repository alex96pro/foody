import React from 'react';
import {useForm} from 'react-hook-form';
import './rateCook.modal.scss';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function RateCookModal(props) {

    const {register, handleSubmit, errors} = useForm();

    return (
        <Modal isOpen={props.openModal} onRequestClose={props.cancelRatingModal} className="modal-rate-cook">
            <div className="modal-rate-cook-header">
            {props.selectedCook.fullname}
            </div>
            <form onSubmit={handleSubmit(props.onSubmitRating)}>
                <div className="modal-rate-cook-body">
                        Rating
                        <select name="rating" ref={register()}>
                        <option value="5">5</option>
                        <option value="4">4</option>  
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                        </select>
                        {errors.rating && <p>Rating is required</p>}
                    <div>Description</div>
                    <textarea name="description" ref={register()}/>
                </div>
                <div className="modal-rate-cook-footer">
                    <button type="submit" className="modal-rate-cook-button">Rate</button>
                    <button type="button" onClick={props.cancelRatingModal} className="modal-rate-cook-cancel-button">Cancel</button>
                </div>
            </form>     
         </Modal>  
    );
};

