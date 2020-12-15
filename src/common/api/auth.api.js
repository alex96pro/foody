import { BACKEND_API } from '../../consts.js';
import axios from 'axios';
import {viewProfile,loadingProfile} from '../actions/profile.actions';
import {serverErrorToast} from '../toasts/toasts';
export const COOK = "COOK";
export const CUSTOMER = "CUSTOMER";
export const INCORRECT_INPUT = "INCORRECT_INPUT";
export const NOT_VERIFIED = "NOT_VERIFIED";
export const REGISTERED = "REGISTERED";
export const EMAIL_EXISTS = "EMAIL_EXISTS";
export const INVALID_EMAIL = "INVALID_EMAIL";

export async function loginAPI(data, afterLogin) {
    try{
        let response = await axios.post(`${BACKEND_API}/auth/login`,{email:data.email, password:data.password});
        if(response.data.accessToken){
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
        if(err.response.status === 403){
            afterLogin(NOT_VERIFIED);
        }
        console.log(err);
    }
};

export async function signUpAPI(data, role, afterSignUp) {
    try{
        let response = await axios.post(`${BACKEND_API}/auth/register`,
        {email:data.email, fullname:data.fullname, password:data.password, location:data.location, userType:role, profilePhoto:data.profilePhoto});
        switch(response.data){
            case "Registered":
            afterSignUp(REGISTERED, data.email);
            break;
            case "email exists":
            afterSignUp(EMAIL_EXISTS);
            break;
            case "INVALID_EMAIL":
            afterSignUp(INVALID_EMAIL);
            break;
            default:
            afterSignUp("ERROR");
        }
    }catch(err){
        serverErrorToast();
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
            serverErrorToast();
            console.log(err);
        }
    };  
};