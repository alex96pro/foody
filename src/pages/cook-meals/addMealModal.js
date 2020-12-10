import React from 'react';
import {useForm} from 'react-hook-form';
import './editMealModal.scss';
import {useState, useEffect} from 'react';
import { errorToast } from '../../common/toasts/toasts';
import { CURRENCY } from '../../consts';

export default function AddMealModal(props) {

    const [tag, setTag] = useState();
    const [tags, setTags] = useState([]);
    const [disableAddTag, setDisableAddTag] = useState({disable:true, message:''});
    const [modalPosition, setModalPosition] = useState('-200%');
    const {register, handleSubmit, errors} = useForm();
    
    useEffect(() => {
        setModalPosition('0');
    }, []);
   
    const addTag = () => {
        if(tags.some(element => element === tag.trim())){
            errorToast("You already have that tag");
        }else{
            setTags([...tags, tag]);
        }
    };

    const removeTag = (removeTag) => {
        setTags(tags.filter((tag) => tag!==removeTag));
    };

    const changeTag = (event) => {
        if(/^[a-zA-Z0-9\s]+$/.test(event.target.value)){
            setTag(event.target.value);
            setDisableAddTag({disable:false, message:''});
        }else if(event.target.value===""){
            setDisableAddTag({disable:true, message:''});
        }else{
            setDisableAddTag({disable:true, message:'Tags can contain only letters and numbers'});
        }
    }

    return (
        <div>
            <div className="modal-overlay" onClick={props.closeAddMealModal}></div>
            <div className="modal" style={{top: modalPosition}}>
                <div className="modal-header">
                    <span>New meal</span><span onClick={props.closeAddMealModal} className="modal-x">x</span>
                </div>
                <form onSubmit={handleSubmit(props.addMeal)}>
                    <div className="modal-body">
                            <div>Meal name</div>
                            <input type="text" name="name" ref={register({required:true})}/>
                            <div>Meal description</div>
                            <textarea name="description" ref={register({required:true})}/>
                            <div>Meal price</div>
                            <input type="number" name="price" ref={register({required:true, validate: value => value > 0})} step=".01"/>{CURRENCY}
                            <div>Meal tags</div>
                            <div className="meal-tags">
                                {tags.map((tag, index) => 
                                    <div className="meal-tag" key={index}>{tag}<button onClick={() => removeTag(tag)} className="remove-tag-button">x</button></div>
                                )}
                            </div>
                            <input type="text" name="tag" onChange={changeTag}/>
                            <input type="text" name="tags" value={tags} onChange={() => {}} ref={register()} className="hidden"/>
                            <button type="button" onClick={addTag} className={disableAddTag.disable?"add-tag-button-disabled":"add-tag-button"}>Add</button>
                            <div className="message-danger">{disableAddTag.message}</div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="modal-confirm">Confirm</button>
                        <button type="button" onClick={props.closeAddMealModal} className="modal-cancel">Cancel</button>
                    </div>  
                </form>  
            </div>  
        </div> 
    );
};

