import {PUT_COOKS_IN_STORE, PUT_SELECTED_MEALS_IN_STORE, SET_LOADING_STATUS_COOKS, NO_COOKS_ON_LOCATION, SET_LOADING_STATUS_MEALS, UPDATE_RATED_COOK} from '../actions/customer.actions';

const initialState = {
    cooks:[],
    meals:[],
    loadingStatus:false,
    selectedCookId:'',
    searchedLocation:'',
    pagesCooks:[],
    pagesMeals:[],
};

export default function customerReducer(state = initialState, action){
    switch(action.type){
        case PUT_COOKS_IN_STORE:
            return {
                ...state,
                cooks:action.payload.cooks,
                loadingStatus:false,
                pagesCooks:action.payload.pages?action.payload.pages:state.pagesCooks,
                searchedLocation:action.payload.searchedLocation,
            };
        case SET_LOADING_STATUS_COOKS:
            return {
                ...state,
                loadingStatus:true,
            };
        case NO_COOKS_ON_LOCATION:
            return {
                ...state,
                loadingStatus:false,
            };
        case PUT_SELECTED_MEALS_IN_STORE:
            return {
                ...state,
                meals:action.payload.meals,
                loadingStatus:false,
                selectedCookId:action.payload.cookId,
                pagesMeals:action.payload.pages?action.payload.pages:state.pagesMeals
            };
        case SET_LOADING_STATUS_MEALS:
            return {
                ...state,
                loadingStatus:true
            };
        case UPDATE_RATED_COOK:
            return{
                ...state,
                cooks: state.cooks.map((cook) => cook.userId === action.payload.userId ? action.payload : cook)
            };
        default:
            return state;
    }
};