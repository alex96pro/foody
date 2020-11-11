import React from 'react';
import {useSelector} from 'react-redux';
import MealIcon from '../../images/meal-icon.jpg';
import './cart.scss';
import NavBar from '../../components/NavBar/NavBar.js';
export default function Cart(props){
    
    const meals = useSelector(state=>state.cartReducer.meals);
    return(
        <div>
            <NavBar isLoggedIn = {true} role={localStorage.getItem("role")}/>
            <div className="cart-meals">
                <div className="cart-header"><h1>Meals in your cart</h1></div>
                    {meals.map(
                        meal=>
                        <div className="cart-meal-details">
                            <div>
                                <div>{meal.name}</div>
                            </div>
                            <div>
                                <img src={MealIcon} alt="jej" width="40px" height="40px"/>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};