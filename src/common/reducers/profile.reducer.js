import {VIEW_PROFILE} from '../actions/profile.actions';
const initialState = {
    user:{
        fullname:"",
        email:"",
        location:""
    }
}
export default function profileReducer(state=initialState, action){
    switch(action.type){
        case VIEW_PROFILE:
            return {
                ...state,
                user:{
                    fullname:action.payload.fullname,
                    email:action.payload.email,
                    location:action.payload.location
                }
            }
        default:
            return state;
    }
}