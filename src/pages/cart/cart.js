import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MealIcon from '../../images/meal-icon.jpg';
import './cart.scss';
import NavBar from '../../components/NavBar/NavBar.js';
import { removeMealFromCart } from '../../common/actions/cart.actions';
import {Link} from 'react-router-dom';
export default function Cart(props){
    
    const meals = useSelector(state=>state.cartReducer.meals);
    const dispatch = useDispatch();
    const handleRemove = (index) =>{
        dispatch(removeMealFromCart(index));
    }
    return(
        <div>
            <NavBar isLoggedIn = {true} role={localStorage.getItem("role")}/>
            <div className="cart-meals">
                <div className="cart-header">
                    {meals.length?<h1>Meals in your cart</h1>:<div>
                    <h1>You don't have any meals in your cart</h1>
                    <Link to="/customer"><button className="main-button">Find Cooks</button></Link></div>}
                </div>
                    {meals.map(
                        (meal,index)=>
                        <div className="cart-meal-details" key={index}>
                            <div>
                                <div>{meal.name}</div>
                            </div>
                            <div>
                                <img src={MealIcon} alt="jej" width="40px" height="40px"/>
                            </div>
                            <div>
                                <button className="remove-from-cart-button" onClick={()=>handleRemove(index)}>Remove</button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};