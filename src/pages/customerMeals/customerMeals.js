import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './customerMeals.scss';
import NavBar from '../../components/NavBar/NavBar';
import MealIcon from '../../images/meal-icon.jpg';
import {putMealInCart, increaseMealAmountInCart} from '../../common/actions/cart.actions';

export default function CustomerMeals(props){

    const meals = useSelector(state=>state.customerReducer.meals);
    const mealsInCart = useSelector(state=>state.cartReducer.meals);
    const dispatch = useDispatch();

    const handleAddToCart = (meal) =>{
        console.log(mealsInCart);
        let mealExistsInCart = false;
        let id;
        for(let i=0;i<mealsInCart.length;i++){
            if(mealsInCart[i].meal.mealId === meal.mealId){
                    mealExistsInCart = true;
                    id = mealsInCart[i].meal.mealId;
                    break;
            }
        }
        if(mealExistsInCart){                               //meal already exists in cart
            dispatch(increaseMealAmountInCart(id));
        }else{                                              //meal doesnt exist in cart
            dispatch(putMealInCart({meal:meal, amount:1})); 
        }
    }
    
    return (
    <div>
        <NavBar isLoggedIn={true} role={localStorage.getItem("role")}/>
        <div className="customer-meals">
            {meals.map(
                meal=>
                <div className="meal-details" key={meal.mealId}>
                    <div>
                        <div className="meal-name">{meal.name}</div>
                        <div>{meal.description}</div>
                        <div>{meal.price}$</div>
                        <div><button className="button-add-to-cart" onClick={()=>handleAddToCart(meal)}>Add to cart</button></div>
                    </div>
                    <div>
                        <img src={MealIcon} alt="jej" width="40px" height="40px"/>
                    </div>
                </div>
            )}
        </div>
    </div>);
}