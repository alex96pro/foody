import React from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar/NavBar';
import "./register.scss";
import { useForm } from 'react-hook-form';
import { useState } from 'react';



function Register(props){
  
  const {register, handleSubmit, errors} = useForm();
  const [state,setState] = useState({message:''});

  const onSubmit = (data) =>{
    axios.post(`/auth/register`,{data})
      .then(response =>{
        switch(response.data){
          case "Registered":
            alert("Registration Successful !");
            props.history.push("/login");
          break;
          case "email exists":
            setState({message:"e-mail already exists"});
          break;
          default:
            break;
        }
      })
      .catch(error =>{
        console.log(error);
      })
  }
      return (
        <div>
          <NavBar isLoggedIn = {false}/>
          <div className="register">
            <div className="wrapper">
              <h2>Register page</h2>
              <form onSubmit = {handleSubmit(onSubmit)} encType="multipart/form-data">
                  <div className="register-label">Fullname</div>
                      <input
                      type="text"
                      name="fullname"
                      ref={register({required:true})}
                      />
                      {errors.fullname && <p>Fullname is required</p>}
                  <div className="register-label">email</div>
                      <input
                      type="email"
                      name="email"
                      ref={register({required:true})}
                      />
                      {errors.email && <p>email is required</p>}
                  <div className="register-label">password</div>
                      <input
                      type="password"
                      name="password"
                      ref={register({required:true})}
                      />
                      {errors.password && <p>password is required</p>}
                  <div className="register-label">Retype password</div>
                      <input
                      type="password"
                      name="repeatedPassword"
                      ref={register({required:true})}
                      />
                      {errors.repeatedPassword && <p>Repeat password</p>}
                  <div className="register-label">Role</div>
                      <select name="userType" ref={register({required:true})}>
                        <option value="Customer">Customer</option>
                        <option value="Cook">Cook</option>
                      </select>
                  <div className="register-label">Location</div>
                      <input
                      type="text"
                      name="location"
                      ref={register({required:true})}
                      />
                      {errors.location && <p>location is required</p>}
                  <div className="register-label">Profile photo<div> 
                      <input 
                      type="file" 
                      name="profilePhoto" 
                      ref={register()}
                      />
                  </div>
                      <button type="submit" className="register-button">Register</button>
                  </div>
              </form>
              <div className="message-danger">{state.message}</div>
            </div>
          </div>
        </div>
      );
}

export default Register;
