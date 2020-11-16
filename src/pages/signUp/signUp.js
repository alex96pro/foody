import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import "./signUp.scss";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {signUpAPI,REGISTERED,EMAIL_EXISTS} from '../../common/api/auth.api';

export default function SignUp(props){

    const {register, handleSubmit, errors} = useForm();
    const [state, setState] = useState({signUpType:props.location.state.role, message:''});

    const onSubmit = (data) => {
        signUpAPI(data, state.signUpType, afterSignUp);
    };

    const afterSignUp = (outcome) =>{
      switch(outcome){
        case REGISTERED:
          alert("Registration successful!");
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
      <div>
        <NavBar isLoggedIn = {false}/>
        <div className="sign-up">
          <div className="wrapper">
          <h2>Register page</h2>
          <h2>{props.location.state.role}</h2>
            <form onSubmit = {handleSubmit(onSubmit)} encType="multipart/form-data">
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
                <div className="sign-up-label">Profile photo<div> 
                    <input 
                    type="file" 
                    name="profilePhoto" 
                    ref={register()}
                    />
                </div>
                    <button type="submit" className="sign-up-button">Sign Up</button>
                </div>
            </form>
            <div className="message-danger">{state.message}</div>
          </div>
        </div>
      </div>
    );
};
