import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './customerMeals.scss';
import NavBar from '../../components/NavBar/NavBar';
import MealIcon from '../../images/meal-icon.jpg';
import { useState, useEffect } from 'react';
import {putMealInCart, increaseMealAmountInCart} from '../../common/actions/cart.actions';
import Spinner from '../../images/spinner.gif';
import {CURRENCY} from '../../consts';
import AddMealToCartModal from './addMealToCart.modal';
import Paging from '../../components/Paging/paging';
import { infoToast } from "../../common/toasts/toasts";
import {getMealsAPI} from '../../common/api/customer.api';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import queryString from 'query-string';

export default function CustomerMeals(props) {

    const meals = useSelector(state => state.customerReducer.meals);
    const mealsInCart = useSelector(state => state.cartReducer.meals);
    const loadingStatus = useSelector(state => state.customerReducer.loadingStatus);
    const pages = useSelector(state => state.customerReducer.pagesMeals);
    const dispatch = useDispatch();
    const [state, setState] = useState({openModal:false,selectedMeal:{}, currentPage:1, name:'',filters:[], sort:''});
    const {register, handleSubmit} = useForm();
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        let queries = (queryString.parse((props.location.search)));
        console.log(queries);
        let name = queries.name ? queries.name: state.name;
        let filters = queries.filters ? queries.filters: state.filters;
        let sort = queries.sort ? queries.sort: state.sort;
        dispatch(getMealsAPI(params.id, state.currentPage, name, filters, sort));
    }, [dispatch, params.id, props.location.search, state]);

    const addToCart = (meal) => {
        setState({...state, openModal:true,selectedMeal:meal})
    };

    const cancelModal = () => {
        setState({...state, openModal:false,selectedMeal:{}})
    };
    
    const changePage = (page) => {
        setState({...state, currentPage:page});
    };

    const searchMeals = (data) => {
        setState({...state, name:data.searchedMeal});
        history.push(`/customerMeals/${params.id}?name=${data.searchedMeal}&filters=${state.filters.join(",")}&sort=${state.sort}`);
    };

    const clearSearch = () => {
        setState({...state, name:''});
        history.push(`/customerMeals/${params.id}?name=${''}&filters=${state.filters.join(",")}&sort=${state.sort}`);
        document.getElementById('searchedMeal').value='';
    };

    const sortByPrice = (event) => {
        setState({...state, sort:event.target.value});
        history.push(`/customerMeals/${params.id}?name=${state.name}&filters=${state.filters.join(",")}&sort=${event.target.value}`);
    };

    const applyFilter = (event) => {
        let newFilters;
        if(event.target.checked){
            newFilters = [...state.filters, event.target.value];
        }else{
            newFilters = state.filters.filter((filterName) => filterName !== event.target.value);
        }
        setState({...state, filters:newFilters});
        history.push(`/customerMeals/${params.id}?name=${state.name}&filters=${newFilters.join(",")}&sort=${state.sort}`);
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
        setState({...state, openModal:false, selectedMeal:{}})
    };

    return (
        <div className="customer-meals">
            <NavBar isLoggedIn={true} role={localStorage.getItem("role")}/>
            <div className="meals-search-bar">
                <div className="meals-search-bar-box">
                    <form onSubmit={handleSubmit(searchMeals)}>
                        Search meals
                        <input 
                        type="text" 
                        name="searchedMeal"
                        id="searchedMeal" 
                        placeholder="Meal name..."
                        ref={register({required:true})}/>
                        <button type="submit" className="button-small">Search</button>
                        <button type="button" className="button-small-bordered" onClick={clearSearch}>Clear</button>
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