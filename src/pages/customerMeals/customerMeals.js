import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './customerMeals.scss';
import NavBar from '../../components/NavBar/NavBar';
import MealIcon from '../../images/meal-icon.jpg';
import { useState } from 'react';
import {putMealInCart, increaseMealAmountInCart} from '../../common/actions/cart.actions';
import Spinner from '../../images/spinner.gif';
import {CURRENCY} from '../../consts';
import AddMealToCartModal from './addMealToCart.modal';
import {changeMealsPageAPI} from '../../common/api/customer.api';
import Paging from '../../components/Paging/paging';
import { infoToast } from "../../common/toasts/toasts";

export default function CustomerMeals(){

    const meals = useSelector(state => state.customerReducer.meals);
    const mealsInCart = useSelector(state => state.cartReducer.meals);
    const loadingStatus = useSelector(state => state.customerReducer.loadingStatus);
    const pages = useSelector(state => state.customerReducer.pagesMeals);
    const selectedCookId = useSelector(state => state.customerReducer.selectedCookId);
    const dispatch = useDispatch();
    const [state, setState] = useState({openModal:false,selectedMeal:{}});

    const addToCart = (meal) => {
        setState({openModal:true,selectedMeal:meal})
    };

    const cancelModal = () => {
        setState({openModal:false,selectedMeal:{}})
    };
    
    const changePage = (page) => {
        dispatch(changeMealsPageAPI(page, selectedCookId));
    };
    const onSubmit = (data) => {
        let mealExistsInCart = false;
        let id;
        for(let i = 0; i < mealsInCart.length; i++){
            if(mealsInCart[i].meal.mealId === state.selectedMeal.mealId){
                mealExistsInCart = true;
                id = mealsInCart[i].meal.mealId;
                break;
            }
        }
        if(mealExistsInCart){                               //meal already exists in cart
            dispatch(increaseMealAmountInCart({id:id, amount:data.amount}));
            infoToast("Added to cart");
        }else{                                              //meal doesnt exist in cart
            dispatch(putMealInCart({meal:state.selectedMeal, amount:data.amount}));
            infoToast("Added to cart");
        }
        setState({openModal:false, selectedMeal:{}})
    };

    return (
    <div>
        <NavBar isLoggedIn={true} role={localStorage.getItem("role")}/>
        {loadingStatus?<div className="spinner"><img src={Spinner} alt="Loading..."/></div>:
        <div className="customer-meals">
            {meals.map(
                meal =>
                <div className="meal-details" key={meal.mealId}>
                    <div>
                        <div className="meal-name">{meal.name}</div>
                        <div>{meal.description}</div>
                        <div className="meal-tags">
                            {meal.tags.map((tag,index) => 
                                <div className="meal-tag" key={index}>{tag}</div>
                            )}
                        </div>
                        <div className="cart-price">{meal.price}{CURRENCY}</div>
                        <div> 
                            <button onClick={() => addToCart(meal)} className="button-main no-left-margin">Add to cart</button>
                        </div>
                    </div>
                    <div>
                        <img src={MealIcon} className="meal-icon" alt="Meal icon"/>
                    </div>
                </div>
            )}
            {pages.length > 1 && <Paging pages={pages} changePage={changePage} type="currentPageCustomerMeals"/>}
        </div>}

        {state.openModal && 
        <AddMealToCartModal 
            openModal={state.openModal} 
            selectedMeal={state.selectedMeal}
            onSubmit={onSubmit}
            cancelModal={cancelModal}
        />}
    </div>
    );
};