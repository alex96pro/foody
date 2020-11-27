import { COOK_SHOW_MEALS, SHOW_LOADING_STATUS_MEALS, UPDATE_MEAL } from '../actions/cook.actions';

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
        case UPDATE_MEAL:
            return{
                ...state,
                meals: state.meals.map((meal) => meal.mealId === action.payload.mealId ? action.payload : meal)
            }
        default:
            return state;
    }
};