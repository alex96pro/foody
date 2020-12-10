import React from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import { getMealsAPI, deleteMealAPI, editMealAPI, addMealAPI } from '../../common/api/cook.api';
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paging from '../../components/Paging/paging';
import Spinner from '../../images/spinner.gif';
import './cook-meals.scss';
import Modal from '../../components/Modal/modal';
import EditMealModal from './editMealModal';
import { CURRENCY } from '../../consts.js';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';
import AddMealModal from './addMealModal.js';

export default function CookMeals(props) {
  
    const [state, setState] = useState({showConfirmModal:false, showEditModal:false, showAddModal:false, selectedMeal:{}});
    const loadingStatus = useSelector(state => state.cookReducer.loadingStatus);
    const meals = useSelector(state => state.cookReducer.meals);
    const pages = useSelector(state => state.cookReducer.pages);
    const currentPage = useSelector(state => state.uiReducer.currentPageCookMeals);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        let queries = queryString.parse((props.location.search));
        dispatch(getMealsAPI(params.id, queries.page));
    }, [dispatch, params.id, props.location.search]);

    const changePage = (page) => {
        props.history.push(`/cook-meals/${params.id}?page=${page}`)
    };
    
    const handleShowConfirmModal = (meal) => {
        setState({...state, showConfirmModal:true, selectedMeal:meal});
    };

    const handleShowEditModal = (meal) => {
        setState({...state, showEditModal:true, selectedMeal:meal});
    };

    const handleShowAddModal = () => {
        setState({...state, showAddModal:true});
    };

    const closeConfirmModal = () => {
        setState({...state, showConfirmModal:false});
    };

    const closeEditModal = () => {
        setState({...state, showEditModal:false});
    };

    const closeAddMealModal = () => {
        setState({...state, showAddModal:false});
    };
    
    const editMeal = (data) => {
        setState({...state, showEditModal:false});
        dispatch(editMealAPI(data, state.selectedMeal.mealId));
    };

    const addMeal = (data) => {
        setState({...state, showAddModal:false});
        dispatch(addMealAPI(data));
    };

    const deleteMeal = () => {
        setState({...state, showConfirmModal:false});
        dispatch(deleteMealAPI(state.selectedMeal.mealId, currentPage));
    };

    return (
        <div className="cook-meals">
            <NavBar isLoggedIn={true} role={localStorage.getItem("role")}/>
            <div className="cook-meals-box">
                <div className="new-meal-container"><button onClick={handleShowAddModal} className="add-new-meal-button">+ New meal</button></div>
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
                <Modal confirm={deleteMeal} closeConfirmModal={closeConfirmModal}
                header={state.selectedMeal.name}
                text="Are you sure you want to delete this meal?"
                />
            }
            {state.showEditModal &&
                <EditMealModal 
                closeEditModal={closeEditModal} 
                onSubmitEdit={editMeal}
                meal={state.selectedMeal}/>
            }
            {state.showAddModal &&
                <AddMealModal
                closeAddMealModal={closeAddMealModal}
                addMeal={addMeal}
                />
            }
        </div>
    );
};
