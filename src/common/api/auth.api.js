import { BACKEND_API } from '../../consts.js';
import axios from 'axios';
import {viewProfile,loadingProfile} from '../actions/profile.actions';
export const COOK = "COOK";
export const CUSTOMER = "CUSTOMER";
export const INCORRECT_INPUT = "INCORRECT_INPUT";
export const REGISTERED = "REGISTERED";
export const EMAIL_EXISTS = "EMAIL_EXISTS";

export function loginAPI(data, afterLogin){
    axios.post(`${BACKEND_API}/auth/login`,{email:data.email, password:data.password})
      .then(response => {
        if(response.data !== null){
            localStorage.setItem("loginToken", response.data.accessToken);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("userId", response.data.userId);
            if(response.data.userType === "Cook"){
              localStorage.setItem("role","COOK");
              afterLogin(COOK);
            }else{
              localStorage.setItem("role","CUSTOMER");
              afterLogin(CUSTOMER);
            }
        }else{
            afterLogin(INCORRECT_INPUT);
        }
      })
      .catch(error => {
          console.log(error);
      })
};

export function signUpAPI(data, signUpType, afterSignUp){
    axios.post(`${BACKEND_API}/auth/register`,{email:data.email, fullname:data.fullname, password:data.password, location:data.location, userType:signUpType})
      .then(response =>{
        switch(response.data){
          case "Registered":
            afterSignUp(REGISTERED);
            break;
          case "email exists":
            afterSignUp(EMAIL_EXISTS);
            break;
          default:
            afterSignUp("ERROR");
        }
      })
      .catch(error =>{
        console.log(error);
      })
};

export function profileAPI(){
    return (dispatch) => {
        dispatch(loadingProfile());
        axios.get(`${BACKEND_API}/auth/profile`,{headers:{'Authorization':`Basic ${localStorage.getItem("loginToken")}`}})
        .then(response =>{
          dispatch(viewProfile(response.data));
        })
        .catch(error =>{
            console.log(error);
        })
    }; 
};