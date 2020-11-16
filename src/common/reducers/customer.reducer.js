import {PUT_COOKS_IN_STORE, PUT_SELECTED_MEALS_IN_STORE, SET_LOADING_STATUS_COOKS, NO_COOKS_ON_LOCATION, SET_LOADING_STATUS_MEALS} from '../actions/customer.actions';

const initialState = {
    cooks:[],
    meals:[],
    loadingStatus:false,
    message:''
};

export default function customerReducer(state = initialState, action){
    switch(action.type){
        case PUT_COOKS_IN_STORE:
            return {
                ...state,
                cooks:action.payload,
                loadingStatus:false,
                message:''
            }
        case SET_LOADING_STATUS_COOKS:
            return {
                ...state,
                loadingStatus:true,
                message:''
            }
        case NO_COOKS_ON_LOCATION:
            return {
                ...state,
                loadingStatus:false,
                message:'No cooks on location '+action.payload
            }
        case PUT_SELECTED_MEALS_IN_STORE:
            return {
                ...state,
                meals:action.payload,
                loadingStatus:false,
                message:''
            }
        case SET_LOADING_STATUS_MEALS:
            return {
                ...state,
                loadingStatus:true
            }
        default:
            return state;
    }
};