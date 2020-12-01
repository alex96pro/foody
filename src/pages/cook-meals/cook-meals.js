import React from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import { getMealsAPI, deleteMealAPI, editMealAPI } from '../../common/api/cook.api';
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paging from '../../components/Paging/paging';
import Spinner from '../../images/spinner.gif';
import './cook-meals.scss';
import ConfirmModal from '../../components/confirmModal/confirmModal';
import EditMealModal from './editMealModal';
import { CURRENCY } from '../../consts.js';
import { useParams } from 'react-router-dom';

export default function CookMeals(props) {
  
    const [state, setState] = useState({showConfirmModal:false, showEditModal:false, selectedMeal:{}});
    const loadingStatus = useSelector(state => state.cookReducer.loadingStatus);
    const meals = useSelector(state => state.cookReducer.meals);
    const pages = useSelector(state => state.cookReducer.pages);
    const currentPage = useSelector(state => state.uiReducer.currentPageCookMeals);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(getMealsAPI(params.id));
    }, [dispatch, params.id]);

    const changePage = (page) => {
        dispatch(getMealsAPI(params.id, page));
    };

    const deleteMeal = () => {
        setState({...state, showConfirmModal:false});
        dispatch(deleteMealAPI(state.selectedMeal.mealId, currentPage));
    };
    
    const handleShowConfirmModal = (meal) => {
        setState({...state, showConfirmModal:true, selectedMeal:meal});
    };

    const handleShowEditModal = (meal) => {
        setState({...state, showEditModal:true, selectedMeal:meal});
    };

    const closeConfirmModal = () => {
        setState({...state, showConfirmModal:false});
    };

    const closeEditModal = () => {
        setState({...state, showEditModal:false});
    };
    
    const onSubmitEdit = (data) => {
        setState({...state, showEditModal:false});
        dispatch(editMealAPI(data, state.selectedMeal.mealId));
    };

    return (
        <div className="cook-meals">
            <NavBar isLoggedIn={true} role={localStorage.getItem("role")}/>
            <div className="cook-meals-box">
                {!loadingStatus?
                <div>{meals.map((meal,index) => <div key={index} className="cook-meal">
                    <div className="cook-meal-name">{meal.name}</div>
                    <div className="cook-meal-description">{meal.description}</div>
                    <div className="meal-tags">
                    {meal.tags.map((tag,index) => 
                            <div className="meal-tag" key={index}>{tag}</div>
                        )}
                    </div>
                    <div className="cook-meal-price">{meal.price}{CURRENCY}</div>
                    <div>
                    <button className="button-small" onClick={() => handleShowEditModal(meal)}>Edit</button>
                    <button className="button-small" onClick={() => handleShowConfirmModal(meal)}>Delete</button>
                    </div>
                </div>)}</div>
                :<div className="spinner"><img src={Spinner} alt="Loading..."></img></div>}
                
                {pages.length > 1 && <Paging changePage={changePage} pages={pages} type="currentPageCookMeals"/>}
            </div>
            
            {state.showConfirmModal &&
                <ConfirmModal openModal={state.showConfirmModal} closeConfirmModal={closeConfirmModal} deleteMeal={deleteMeal}
                header={state.selectedMeal.name}
                text="Are you sure you want to delete this meal?"
                />
            }
            {state.showEditModal &&
                <EditMealModal 
                showEditModal={state.showEditModal} 
                closeEditModal={closeEditModal} 
                onSubmitEdit={onSubmitEdit}
                meal={state.selectedMeal}/>
            }
        </div>
    );
};
