import React from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import {getMealsAPI, changePageCookMealsAPI, deleteMealAPI, editMealAPI} from '../../common/api/cook.api';
import {useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Paging from '../../components/Paging/paging';
import Spinner from '../../images/spinner.gif';
import './cook.scss';
import ConfirmModal from '../../components/confirmModal/confirmModal';
import EditMealModal from './editMealModal';
import { CURRENCY } from '../../consts.js';

export default function Cook(){
  
  const [state, setState] = useState({showMeals:false, showConfirmModal:false, showEditModal:false, selectedMeal:''});
  const loadingStatus = useSelector(state => state.cookReducer.loadingStatus);
  const meals = useSelector(state => state.cookReducer.meals);
  const pages = useSelector(state => state.cookReducer.pages);
  const currentPage = useSelector(state => state.uiReducer.currentPageCookMeals);
  const dispatch = useDispatch();

  const showMeals = () => {
    setState({...state, showMeals:true});
    dispatch(getMealsAPI(localStorage.getItem("userId")));
  };

  const changePage = (page) => {
    dispatch(changePageCookMealsAPI(localStorage.getItem("userId"), page));
  };

  const deleteMeal = (mealId) => {
    dispatch(deleteMealAPI(mealId));
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
    dispatch(editMealAPI(data, state.selectedMeal.mealId, currentPage));
  };

    return (
    <div>
        <NavBar isLoggedIn={true} role={localStorage.getItem("role")}/>
      <div className="cook">
        <h1>Welcome Cook !</h1>
          <div className="cook-nav">
              <button onClick={showMeals} className="button-main">My meals</button>
              <button className="button-main">My orders</button>
          </div>
          <div className="cook-meals">
            {state.showMeals &&
              loadingStatus? <div className="spinner"><img src={Spinner} alt="Loading..."/></div>:
              <div>{meals.map((meal,index) => <div key={index} className="cook-meal">
                <div className="cook-meal-name">{meal.name}</div>
                <div className="cook-meal-description">{meal.description}</div>
                <div className="cook-meal-price">{meal.price}{CURRENCY}</div>
                <div>
                  <button className="button-small" onClick={() => handleShowEditModal(meal)}>Edit</button>
                  <button className="button-small" onClick={() => handleShowConfirmModal(meal)}>Delete</button>
                </div>
              </div>)}</div>
              }
              {state.showMeals && <Paging changePage={changePage} pages={pages} type="currentPageCookMeals"/>}
          </div>
          {state.showMeals && meals.length === 0 &&
          <div>You don't have any meals yet<button className="button-main">Add meal</button></div>}
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
