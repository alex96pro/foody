import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import "./signUp.scss";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {signUpAPI,REGISTERED,EMAIL_EXISTS} from '../../common/api/auth.api';
import {infoToast} from '../../common/toasts/toasts';
import { useSelector } from 'react-redux';

export default function SignUp(props) {

    const {register, handleSubmit, errors} = useForm();
    const [state, setState] = useState({message:''});
    const role = useSelector(state => state.uiReducer.chosenRole);
    const [selectedFile, setSelectedFile] = useState();

    const onSubmit = (data) => {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            data.profilePhoto = reader.result;
            signUpAPI(data, role, afterSignUp);
        };
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const afterSignUp = (outcome, email) => {
      switch(outcome){
        case REGISTERED:
            infoToast("Registration successful, we sent you an e-mail to "+email+" ,please verify your account",5000);
            props.history.push('/login');
            break;
        case EMAIL_EXISTS:
            setState({message:"Email already exists"});
            break;
        default:
            setState({message:"Server error"});
      }
    };
  
    return (
        <div className="sign-up">
            <NavBar isLoggedIn={false}/>
            <div className="wrapper">
                <div className="sign-up-header">Sign up to Foody</div>
                <form onSubmit = {handleSubmit(onSubmit)}>
                    <div className="sign-up-label">Fullname</div>
                        <input
                        type="text"
                        name="fullname"
                        ref={register({required:true})}
                        />
                        {errors.fullname && <p>Fullname is required</p>}
                    <div className="sign-up-label">email</div>
                        <input
                        type="email"
                        name="email"
                        ref={register({required:true})}
                        />
                        {errors.email && <p>email is required</p>}
                    <div className="sign-up-label">password</div>
                        <input
                        type="password"
                        name="password"
                        ref={register({required:true})}
                        />
                        {errors.password && <p>password is required</p>}
                    <div className="sign-up-label">Retype password</div>
                        <input
                        type="password"
                        name="repeatedPassword"
                        ref={register({required:true})}
                        />
                        {errors.repeatedPassword && <p>Repeat password</p>}
                    <div className="sign-up-label">Location</div>
                        <input
                        type="text"
                        name="location"
                        ref={register({required:true})}
                        />
                        {errors.location && <p>location is required</p>}
                    <div className="sign-up-label">Profile photo</div> 
                        <input 
                        type="file" 
                        name="profilePhoto"
                        id="file"
                        onChange={handleFileInputChange} 
                        ref={register()}
                        />
                    <div>
                        <button type="submit" className="button-main-no-side-margins">Sign Up</button>
                    </div>
                </form>
                <div className="message-danger">{state.message}</div>
            </div>
        </div>
    );
};
