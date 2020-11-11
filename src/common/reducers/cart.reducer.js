import { PUT_MEAL_IN_CART } from '../actions/cart.actions';

const initialState = {
    meals:[]
}
export default function cartReducer(state = initialState, action){
    switch(action.type){
        case PUT_MEAL_IN_CART:
            return{
                ...state,
                meals: [...state.meals, action.payload]
            }
        default:
            return state;
    }
}