export const VIEW_PROFILE = "VIEW_PROFILE";
export const LOGOUT = "LOGOUT";
export const SET_LOADING_STATUS_PROFILE = "SET_LOADING_STATUS_PROFILE";

export function loadingProfile(){
    return{
        type:SET_LOADING_STATUS_PROFILE
    }
};
export function viewProfile(payload){
    return{
        type:VIEW_PROFILE,
        payload
    }
};
export function logout(){
    return{
        type:LOGOUT
    }
};