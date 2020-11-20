import { COOK_SHOW_MEALS } from '../actions/cook.actions';
import { SHOW_LOADING_STATUS_MEALS } from '../actions/cook.actions';
const initialState = {
    meals:[],
    pages:[],
    loadingStatus:false
};

export default function cookReducer(state = initialState, action){
    switch(action.type){
        case COOK_SHOW_MEALS:
            return{
                ...state,
                meals: action.payload.meals,
                pages: action.payload.pages ? action.payload.pages : state.pages,
                loadingStatus:false
            };
        case SHOW_LOADING_STATUS_MEALS:
            return{
                ...state,
                loadingStatus:true
            };
        default:
            return state;
    }
};