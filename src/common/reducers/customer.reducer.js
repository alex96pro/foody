import {PUT_COOKS_IN_STORE} from '../actions/customer.actions';
import {PUT_SELECTED_MEALS_IN_STORE} from '../actions/customer.actions';

const initialState = {
    cooks:[],
    meals:[]
}
export default function customerReducer(state = initialState, action){
    switch(action.type){
        case PUT_COOKS_IN_STORE:
            return {
                ...state,
                cooks:action.payload,
            }
        case PUT_SELECTED_MEALS_IN_STORE:
            return {
                ...state,
                meals:action.payload
            }
        default:
            return state;
    }
};