import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './customerMeals.scss';
import NavBar from '../../components/NavBar/NavBar';
import MealIcon from '../../images/meal-icon.jpg';
import { useState } from 'react';
import {putMealInCart, increaseMealAmountInCart} from '../../common/actions/cart.actions';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

export default function CustomerMeals(props){

    const meals = useSelector(state=>state.customerReducer.meals);
    const mealsInCart = useSelector(state=>state.cartReducer.meals);
    const dispatch = useDispatch();
    const [state,setState] = useState({openModal:false,selectedMeal:{}});
    const {register, handleSubmit, errors} = useForm();

    const handleAddToCart = (meal) =>{
        setState({openModal:true,selectedMeal:meal})
    }
    const onSubmit = (data) =>{
        let mealExistsInCart = false;
        let id;
        for(let i=0;i<mealsInCart.length;i++){
            if(mealsInCart[i].meal.mealId === state.selectedMeal.mealId){
                    mealExistsInCart = true;
                    id = mealsInCart[i].meal.mealId;
                    break;
            }
        }
        if(mealExistsInCart){                               //meal already exists in cart
            dispatch(increaseMealAmountInCart(id));
        }else{                                              //meal doesnt exist in cart
            dispatch(putMealInCart({meal:state.selectedMeal, amount:data.amount})); 
        }
        setState({openModal:false,selectedMeal:{}})
    }
    const cancelModal = () =>{
        setState({openModal:false,selectedMeal:{}})
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
                        <div> 
                            <button onClick={()=>handleAddToCart(meal)} className="button-add-to-cart">Add to cart</button>
                        </div>
                    </div>
                    <div>
                        <img src={MealIcon} alt="jej" width="40px" height="40px"/>
                    </div>
                </div>
            )}
        </div>
        <Modal isOpen={state.openModal} onRequestClose={()=>setState({openModal:false,selectedMeal:{}})} className="modal-add-to-cart">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div><h2>{state.selectedMeal.name}</h2></div>
                <div>Amount</div>
                <input type="number" defaultValue="1" name="amount" ref={register()}></input>
                <div>Aditional info</div>
                <textarea></textarea>
                <div><button className="cancel-cart-modal-button" onClick={cancelModal}>Cancel</button>
                <button type="submit" className="add-to-cart-modal-button">Add</button></div>
            </form>
        </Modal>
    </div>);
}