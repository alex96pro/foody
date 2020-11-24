import React from 'react';
import {useForm} from 'react-hook-form';
import './editMealModal.scss';
import {useState} from 'react';
import Modal from 'react-modal';
import { errorToast } from '../../common/toasts/toasts';
import { CURRENCY } from '../../consts';
Modal.setAppElement('#root');

export default function EditMealModal(props) {

    const {register, handleSubmit, errors} = useForm();
    const [state, setState] = useState(props.meal);
    const [newTag, setNewTag] = useState();
    const [disableAddTag, setDisableAddTag] = useState({disable:true, message:''});

    const handleChange = (event) => {
        if(event.target.name!=="newTag"){
            setState({...state, [event.target.name]:event.target.value});
        }else{
            if(/^[a-zA-Z0-9\s]+$/.test(event.target.value)){
                setNewTag(event.target.value);
                setDisableAddTag({disable:false, message:''});
            }else if(event.target.value===""){
                setDisableAddTag({disable:true, message:''});
            }else{
                setDisableAddTag({disable:true, message:'Tags can contain only letters and numbers'});
            }
        }
    };

    const removeTag = (index) => {
        let newTags = state.tags.filter((tag,i) => i!==index);
        setState({...state, tags:newTags});
    };

    const addNewTag = () => {
        if(state.tags.some(tag => tag === newTag.trim())){
            errorToast("You already have that tag");
        }else{
            setState({...state, tags:[...state.tags, newTag]});
        }
    };

    const handleHidden = () => {} //temporary till hidden input is resolved

    return (
        <Modal isOpen={props.showEditModal} onRequestClose={props.closeEditModal} className="modal-edit-meal">
            <div className="modal-edit-meal-header">
            Edit meal
            </div>
            <form onSubmit={handleSubmit(props.onSubmitEdit)}>
                <div className="modal-edit-meal-body">
                    Name
                    <div>
                        <input type="text" value={state.name} onChange={handleChange} name="name" ref={register({required:true})}/>
                        {errors.name && <p>Name is required</p>}
                    </div>
                    Description
                    <div>
                        <textarea value={state.description} onChange={handleChange} name="description" ref={register({required:true})}/>
                        {errors.description && <p>Description is required</p>}
                    </div>
                    Tags
                    <div className="meal-tags">
                        {state.tags.map((tag,index) => <div className="meal-tag" key={index}>{tag}
                        <button onClick = {() => removeTag(index)} type="button" className="remove-tag-button">x</button>
                        <input name="tags" value={state.tags} onChange={handleHidden} ref={register()} className="hidden"></input>
                        </div>)}
                    </div>
                    Add tag
                    <div className="add-tag">
                        <input type="text" className="input-small" name="newTag" onChange={handleChange}
                        ref={register()}
                        />
                        <button onClick={addNewTag} type="button" className={disableAddTag.disable?"add-tag-button-disabled":"add-tag-button"}>add</button>
                    </div>
                    <div className="message-danger">{disableAddTag.message}</div>
                    Price
                    <div>
                        <input value={state.price} onChange={handleChange} name="price" type="number"
                        ref={register({required:true, validate: value => value > 0})}/>{CURRENCY}
                        {errors.price && errors.price.type === "required" && <p>Price is required</p>}
                        {errors.price && errors.price.type === "validate" && <p>Price must be greater than 0</p>}
                    </div>   
                </div>
                <div className="modal-edit-meal-footer">
                    <button type="submit" className="modal-edit-meal-button">Confirm</button>
                    <button type="button" onClick={props.closeEditModal} className="modal-edit-meal-cancel-button">Cancel</button>
                </div>
            </form>     
        </Modal>  
    );
};

