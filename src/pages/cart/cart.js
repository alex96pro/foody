import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MealIcon from '../../images/meal-icon.jpg';
import './cart.scss';
import NavBar from '../../components/NavBar/NavBar.js';
import { removeMealFromCart } from '../../common/actions/cart.actions';
import {Link} from 'react-router-dom';
import {CURRENCY} from '../../consts';
import {infoToast} from '../../common/toasts/toasts';

export default function Cart(){

    const meals = useSelector(state => state.cartReducer.meals);
    const dispatch = useDispatch();

    const remove = (index) => {
        dispatch(removeMealFromCart(index));
        infoToast("Removed from cart!");
    };

    return(
        <div>
            <NavBar isLoggedIn={true} role={localStorage.getItem("role")}/>
            <div className="cart">
                <div className="cart-header">
                    {meals.length > 0?<h1>Meals in your cart</h1>:<div>
                    <h1>You don't have any meals in your cart</h1>
                    <Link to="/customer"><button className="button-main">Find Cooks</button></Link></div>}
                </div>
                <div className="meals-in-cart">
                {meals.map(
                    (mealWithAmount,index) =>
                    <div className="cart-meal-details" key={index}>
                        <div>
                            <div>{mealWithAmount.meal.name}</div>
                        </div>
                        <div>
                            <div>Amount:{mealWithAmount.amount}</div>
                        </div>
                        <div>
                            <div className="cart-price">Price:{mealWithAmount.amount * mealWithAmount.meal.price}{CURRENCY}</div>
                        </div>
                        <div>
                            <img src={MealIcon} className="cart-meal-icon" alt="Meal icon"/>
                        </div>
                        <div>
                            <button className="remove-from-cart-button" onClick={() => remove(index)}>Remove</button>
                        </div>
                    </div>
                )}
                </div>
                {meals.length > 0 &&
                <div className="cart-checkout">
                    <button className="checkout-button">Checkout{' '}
                    {(meals.reduce((sum,current) => sum + current.meal.price * current.amount, 0)).toFixed(2)}{CURRENCY}
                    </button>
                </div>}
            </div>
        </div>
    );
};