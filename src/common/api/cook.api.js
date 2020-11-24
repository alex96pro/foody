import { BACKEND_API } from '../../consts.js';
import axios from 'axios';
import {showMeals, showLoadingStatusMeals} from '../actions/cook.actions';
import {changePageCookMeals} from '../actions/ui.actions';
import {infoToast, serverErrorToast} from '../toasts/toasts';

export function getMealsAPI(cookId){
    return async (dispatch) => {
      try{
        dispatch(changePageCookMeals(1));
        dispatch(showLoadingStatusMeals());
        let response = await axios.get(`${BACKEND_API}/cook/getMeals/${cookId}`);
        if(response.data !== "NO_MEALS"){
          dispatch(showMeals({meals:response.data.meals, pages:response.data.pages}));
        }else{
          dispatch(showMeals({meals:[], pages:[]}));
        }
      }catch(err){
        console.log(err);
      }
    };
};

export function changePageCookMealsAPI(cookId, page){
    return async (dispatch) => {
      try{
        dispatch(changePageCookMeals(page));
        dispatch(showLoadingStatusMeals());
        let response = await axios.get(`${BACKEND_API}/cook/getMealsOnPage/${cookId}/${page}`);
        dispatch(showMeals({meals:response.data}));
      }catch(err){
        console.log(err);
      }
    }
};

export function editMealAPI(data, mealId, currentPage){
  return async (dispatch) => {
    try{
      let editResponse = await axios.post(`${BACKEND_API}/cook/editMeal/${mealId}`,{meal:data});
      if(editResponse.data === "EDITED"){
        infoToast("Edited meal!");
        let updateResponse = await axios.get(`${BACKEND_API}/cook/getMealsOnPage/${localStorage.getItem("userId")}/${currentPage}`);
        dispatch(showMeals({meals:updateResponse.data}));
      }else{
        serverErrorToast();
      }
    }catch(err){
      console.log(err);
    }   
  };
};

export function deleteMealAPI(mealId){
    
};