import React from 'react';
import {useForm} from 'react-hook-form';
import './rateCook.modal.scss';
import { useState, useEffect } from 'react';

export default function RateCookModal(props) {

    const {register, handleSubmit, errors} = useForm();
    const [modalPosition, setModalPosition] = useState('-200%');

    useEffect(() => {
        setModalPosition('0');
    }, []);
    
    return (
        <div>
            <div className="modal-overlay" onClick={props.closeRatingModal}></div>

            <div className="modal" style={{top: modalPosition}}>
                <div className="modal-header">
                    <span>{props.selectedCook.fullname}</span><span onClick={props.closeRatingModal} className="modal-x">x</span>
                </div>
                <form onSubmit={handleSubmit(props.onSubmitRating)}>
                    <div className="modal-body">
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
                    <div className="modal-footer">
                        <button type="submit" className="modal-confirm">Rate</button>
                        <button type="button" onClick={props.closeRatingModal} className="modal-cancel">Cancel</button>
                    </div>
                </form>     
         </div>  
        </div>
        
    );
};

