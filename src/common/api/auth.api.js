import { BACKEND_API } from '../../consts.js';
import axios from 'axios';
import {viewProfile,loadingProfile} from '../actions/profile.actions';
export const COOK = "COOK";
export const CUSTOMER = "CUSTOMER";
export const INCORRECT_INPUT = "INCORRECT_INPUT";
export const REGISTERED = "REGISTERED";
export const EMAIL_EXISTS = "EMAIL_EXISTS";

export async function loginAPI(data, afterLogin) {
    try{
        let response = await axios.post(`${BACKEND_API}/auth/login`,{email:data.email, password:data.password});
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
    }catch(err){
        console.log(err);
    }
};

export async function signUpAPI(data, signUpType, afterSignUp) {
    try{
        let response = await axios.post(`${BACKEND_API}/auth/register`,
        {email:data.email, fullname:data.fullname, password:data.password, location:data.location, userType:signUpType});
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
    }catch(err){
        console.log(err);
    }
};

export function profileAPI() {
    return async (dispatch) => {
        try{
            dispatch(loadingProfile());
            let response = await axios.get(`${BACKEND_API}/auth/profile`,
            {headers:{'Authorization':`Basic ${localStorage.getItem("loginToken")}`}})
            dispatch(viewProfile(response.data));
        }catch(err){
            console.log(err);
        }
    };  
};