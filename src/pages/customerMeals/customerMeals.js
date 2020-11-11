import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './customerMeals.scss';
import NavBar from '../../components/NavBar/NavBar';
import MealIcon from '../../images/meal-icon.jpg';
import {putMealInCart} from '../../common/actions/cart.actions';

export default function CustomerMeals(props){

    const meals = useSelector(state=>state.customerReducer.meals);
    const dispatch = useDispatch();

    const handleAddToCart = (meal) =>{
        dispatch(putMealInCart(meal))
    }
    
    return (
    <div>
        <NavBar isLoggedIn={true} role={localStorage.getItem("role")}/>
        <div className="customer-meals">
            {meals.map(
                meal=>
                <div className="meal-details">
                    <div>
                        <div className="meal-name">{meal.name}</div>
                        <div>{meal.description}</div>
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