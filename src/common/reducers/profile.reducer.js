import {VIEW_PROFILE, SET_LOADING_STATUS_PROFILE} from '../actions/profile.actions';

const initialState = {
    user:{
        fullname:"",
        email:"",
        location:"",
        profilePhoto:"",
        loadingStatus:false
    }
};

export default function profileReducer(state=initialState, action){
    switch(action.type){
        case VIEW_PROFILE:
            return {
                ...state,
                user:{
                    fullname:action.payload.fullname,
                    email:action.payload.email,
                    location:action.payload.location,
                    profilePhoto:action.payload.profilePhoto,
                    loadingStatus:false
                }
            }
        case SET_LOADING_STATUS_PROFILE:
            return {
                ...state,
                user:{
                    ...state.user,
                    loadingStatus:true
                }
            }
        default:
            return state;
    }
};