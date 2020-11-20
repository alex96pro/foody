import {CHANGE_PAGE_CUSTOMER_COOKS, CHANGE_PAGE_CUSTOMER_MEALS, CHANGE_PAGE_COOK_MEALS} from '../actions/ui.actions';

const initialState = {
    currentPageCustomerMeals:1,
    currentPageCustomerCooks:1,
    currentPageCookMeals:1
};

export default function uiReducer(state=initialState, action){
    switch(action.type){
        case CHANGE_PAGE_CUSTOMER_COOKS:
            return {
                ...state,
                currentPageCustomerCooks:action.payload
            }
        case CHANGE_PAGE_CUSTOMER_MEALS:
            return {
                ...state,
                currentPageCustomerMeals:action.payload
            }
        case CHANGE_PAGE_COOK_MEALS:
            return {
                ...state,
                currentPageCookMeals:action.payload
            };
        default:
            return state;
        }
};