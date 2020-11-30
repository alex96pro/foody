import {CHANGE_PAGE_CUSTOMER_COOKS, CHANGE_PAGE_CUSTOMER_MEALS, CHANGE_PAGE_COOK_MEALS, PICKED_REGISTER_ROLE, GET_FEATURED_COOKS} from '../actions/ui.actions';

const initialState = {
    currentPageCustomerMeals:1,
    currentPageCustomerCooks:1,
    currentPageCookMeals:1,
    chosenRole:'',
    featuredCooks:[]
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
        case PICKED_REGISTER_ROLE:
            return {
                ...state,
                chosenRole:action.payload
            }
        case GET_FEATURED_COOKS:
            return {
                ...state,
                featuredCooks:action.payload
            }
        default:
            return state;
        }
};