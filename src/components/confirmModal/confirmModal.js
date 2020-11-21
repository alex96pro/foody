import React from 'react';
import Modal from 'react-modal';
import './confirmModal.scss';
Modal.setAppElement('#root');

export default function ConfirmModal(props){
    return (
        <Modal isOpen={props.openModal} onRequestClose={props.closeConfirmModal} className="confirm-modal">
            <div className="confirm-modal-header">
                {props.header}
            </div>
            <div className="confirm-modal-body">
                {props.text}
            </div>
            <div className="confirm-modal-footer">
                <button onClick={props.deleteMeal} className="confirm-modal-button">Confirm</button>
                <button onClick={props.closeConfirmModal} className="confirm-modal-cancel">Cancel</button>
            </div>
        </Modal>
    );
};