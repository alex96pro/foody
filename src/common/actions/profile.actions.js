export const VIEW_PROFILE = "VIEW_PROFILE";
export const LOGOUT = "LOGOUT";

export function viewProfile(payload){
    return{
        type:VIEW_PROFILE,
        payload
    }
}
export function logout(){
    return{
        type:LOGOUT
    }
}