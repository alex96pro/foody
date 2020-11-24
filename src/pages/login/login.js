import React from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import "./login.scss";
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {loginAPI, COOK, CUSTOMER, INCORRECT_INPUT} from '../../common/api/auth.api';

export default function Login(props) {

    const {register, handleSubmit, errors} = useForm();
    const [state, setState] = useState({message:''});

    const onSubmit = (data) => {
        loginAPI(data, afterLogin);
    };
  
    const afterLogin = (role) => {
        switch(role) {
            case CUSTOMER:
                props.history.push("/customer");
                break;
            case COOK:
                props.history.push("/cook");
                break;
            case INCORRECT_INPUT:
                setState({message:"Incorrect e-mail or password"});
                break;
            default:
                setState({message:"Server error"});
        }
    };
  
    return (
        <div className="login">
            <NavBar isLoggedIn={false}/>
            <div className="wrapper">
                <h2>Log in to Foody</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="login-label">email</div>
                    <input 
                    type="email"
                    name="email"
                    ref={register({required:true})}
                    />
                    {errors.email && <p>email is required</p>}
                    <div className="login-label">password</div>
                    <input 
                    type="password"
                    name="password"
                    ref={register({required:true})}
                    />
                    {errors.password && <p>Password is required</p>}
                    <div><button className="button-main-no-side-margins">Log In</button></div>
                </form>
                <div className="message-danger">{state.message}</div>
            </div>
        </div>
    );
};
