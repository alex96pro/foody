import { PUT_MEAL_IN_CART } from '../actions/cart.actions';
import { REMOVE_MEAL_FROM_CART } from '../actions/cart.actions';
import { INCREASE_MEAL_AMOUNT_IN_CART } from '../actions/cart.actions';

const initialState = {
    meals:[]
};

export default function cartReducer(state = initialState, action){
    switch(action.type){
        case PUT_MEAL_IN_CART:
            return{
                ...state,
                meals: [...state.meals, action.payload]
            }
        case INCREASE_MEAL_AMOUNT_IN_CART:
            return{
                ...state,
                meals: state.meals.filter((mealWithAmount)=>{
                    if(mealWithAmount.meal.mealId === action.payload.id){
                        mealWithAmount.amount = +mealWithAmount.amount + +action.payload.amount;
                    }
                    return mealWithAmount;
                })
            }    
        case REMOVE_MEAL_FROM_CART:
            return{
                ...state,
                meals: state.meals.filter((meal,index)=>index!==action.payload)
            }
        default:
            return state;
    }
};