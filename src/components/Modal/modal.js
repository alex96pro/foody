import React from 'react';
import './modal.scss';
import { useState, useEffect } from 'react';

export default function Modal(props) {


    const [modalPosition, setModalPosition] = useState('-200%');

    useEffect(() => {
        setModalPosition('0');
    },[]);

    return (
        <div>
            <div className="modal-overlay" onClick={props.closeConfirmModal}></div>

            <div className="modal" style={{top: modalPosition}}>
                <div className="modal-header">
                    <span>{props.header}</span>
                    <span onClick={props.closeConfirmModal} className="modal-x">x</span>
                </div>
                <div className="modal-body">
                    {props.text}
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={props.confirm} className="modal-confirm">Confirm</button>
                    <button type="button" onClick={props.closeConfirmModal} className="modal-cancel">Cancel</button>
                </div>
            </div>
        </div>
        
    );
};