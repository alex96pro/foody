import React from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar/NavBar.js';
import "./login.scss";
import {useForm} from 'react-hook-form';
import {useState} from 'react';

function Login(props){

  const {register, handleSubmit, errors} = useForm();
  const [state,setState] = useState({message:''});

  const onSubmit = (data) => {
      axios.post('/auth/login',{email:data.email, password:data.password})
      .then(response => {
        if(response.data !== null){
          let loginToken = response.data.accessToken;
          localStorage.setItem("loginToken", loginToken);
          localStorage.setItem("email", response.data.email);
            if(response.data.userType === "Cook"){
              localStorage.setItem("role","COOK");
              props.history.push("/cook");
            }else{
              localStorage.setItem("role","CUSTOMER");
              props.history.push("/customer");
            }
        }else{
          setState({message:"Incorrect username or password"});
        }
      })
      .catch(error => {
          console.log(error);
      })
  }
      return (
        <div>
          <NavBar isLoggedIn = {false}/>
          <div className="login">
            <div className="wrapper">
              <h2>Login page</h2>
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
                    <div><button type="submit" className="login-button">Log In</button></div>
              </form>
            </div>
            <div className="message-danger">{state.message}</div>
          </div>
        </div>
      );
}
export default Login;
