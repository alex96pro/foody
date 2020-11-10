import {PUT_COOKS_IN_STORE} from '../actions/customer.actions';
const initialState = {
    cooks:[],
}
export default function customerReducer(state = initialState, action){
    switch(action.type){
        case PUT_COOKS_IN_STORE:
            return {
                ...state,
                cooks:action.payload,
            }
        default:
            return state;
    }
};