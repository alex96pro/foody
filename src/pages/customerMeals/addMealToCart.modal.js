import React from 'react';
import {useForm} from 'react-hook-form';
import { useState, useEffect } from 'react'; 

export default function AddMealToCartModal(props) {

    const {register, handleSubmit, errors} = useForm();
    const [modalPosition, setModalPosition] = useState('-200%');

    useEffect(() => {
        setModalPosition('0');
    }, []);

    return(
        <div>
            <div className="modal-overlay" onClick={props.cancelModal}></div>

            <div className="modal" style={{top: modalPosition}}>
                <form onSubmit={handleSubmit(props.onSubmit)}>
                    <div className="modal-header">
                        <span>{props.selectedMeal.name}</span><span onClick={props.cancelModal} className="modal-x">x</span>                   
                    </div>
                    <div className="modal-body">
                        <div>Amount</div>
                        <input type="number" defaultValue="1" min="1" name="amount" ref={register({required:true})}></input>
                        {errors.amount && <p>Amount is required</p>}
                        <div>Aditional info</div>
                        <textarea></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="modal-confirm">Add</button>
                        <button type="button" className="modal-cancel" onClick={props.cancelModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}; 