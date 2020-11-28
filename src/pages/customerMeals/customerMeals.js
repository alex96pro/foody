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
import Paging from '../../components/Paging/paging';
import { infoToast } from "../../common/toasts/toasts";
import {getMealsAPI} from '../../common/api/customer.api';
import { useForm } from 'react-hook-form';

export default function CustomerMeals() {

    const meals = useSelector(state => state.customerReducer.meals);
    const mealsInCart = useSelector(state => state.cartReducer.meals);
    const loadingStatus = useSelector(state => state.customerReducer.loadingStatus);
    const pages = useSelector(state => state.customerReducer.pagesMeals);
    const selectedCookId = useSelector(state => state.customerReducer.selectedCookId);
    const dispatch = useDispatch();
    const [state, setState] = useState({openModal:false,selectedMeal:{}, searchedMeal:'', filters:[], priceSort:''});
    const {register, handleSubmit} = useForm();

    const addToCart = (meal) => {
        setState({openModal:true,selectedMeal:meal})
    };

    const cancelModal = () => {
        setState({openModal:false,selectedMeal:{}})
    };
    
    const changePage = (page) => {
        dispatch(getMealsAPI(selectedCookId, page, state.searchedMeal, state.filters.join(","), state.priceSort));
    };

    const searchMeals = (data) => {
        setState({...state, searchedMeal:data.searchedMeal});
        dispatch(getMealsAPI(selectedCookId,1,data.searchedMeal, state.filters.join(","), state.priceSort));
    };

    const sortByPrice = (event) => {
        setState({...state, priceSort:event.target.value});
        dispatch(getMealsAPI(selectedCookId, 1, state.searchedMeal, state.filters.join(","), event.target.value));
    };

    const applyFilter = (event) => {
        let newFilters;
        if(event.target.checked){
            newFilters = [...state.filters, event.target.value];
        }else{
            newFilters = state.filters.filter((filterName) => filterName !== event.target.value);
        }
        setState({...state, filters: newFilters});
        dispatch(getMealsAPI(selectedCookId, 1, state.searchedMeal, newFilters.join(","), state.priceSort));
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
        }else{                                              //meal doesnt exist in cart
            dispatch(putMealInCart({meal:state.selectedMeal, amount:data.amount}));
        }
        infoToast("Added to cart");
        setState({openModal:false, selectedMeal:{}})
    };

    return (
        <div className="customer-meals">
            <NavBar isLoggedIn={true} role={localStorage.getItem("role")}/>
            <div className="meals-search-bar">
                <div className="meals-search-bar-box">
                    <form onSubmit={handleSubmit(searchMeals)}>
                        Search meals
                        <input type="text" name="searchedMeal" ref={register()}></input>
                        <button type="submit" className="button-small">Search</button>
                    </form>
                </div>
                <div className="meals-search-bar-box">
                    Order by price
                    <select onChange={sortByPrice}>
                        <option value=""></option>
                        <option value="priceLTH" name="priceLTH">Lowest</option>
                        <option value="priceHTL" name="priceHTL">Highest</option>
                    </select>
                </div>
            </div>
            <div className="middle-meals-box">
                <div className="meals-filters">
                    <div><input type="checkbox" onChange={applyFilter} value="vegan" name="vegan"></input>Vegan</div>
                    <div><input type="checkbox" onChange={applyFilter} value="vegetarian" name="vegan"></input>Vegetarian</div>
                    <div><input type="checkbox" onChange={applyFilter} value="gluten free" name="vegan"></input>Gluten free</div>
                    <div><input type="checkbox" onChange={applyFilter} value="sugar free" name="vegan"></input>Sugar free</div>
                    <div><input type="checkbox" onChange={applyFilter} value="organic" name="vegan"></input>Organic</div>
                    <div><input type="checkbox" onChange={applyFilter} value="no gmo" name="vegan"></input>No gmo</div>
                </div>
                {loadingStatus?<div className="spinner"><img src={Spinner} alt="Loading..."/></div>:
                <div className="meals">
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
                                    <button onClick={() => addToCart(meal)} className="button-main-no-side-margins">Add to cart</button>
                                </div>
                            </div>
                            <div>
                                <img src={MealIcon} className="meal-icon" alt="Meal icon"/>
                            </div>
                        </div>
                    )}
                    {pages.length > 1 && <Paging pages={pages} changePage={changePage} type="currentPageCustomerMeals"/>}
                </div>}
                <div className="invisible-box"></div>
            </div>
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