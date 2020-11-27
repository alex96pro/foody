import { BACKEND_API } from '../../consts.js';
import axios from 'axios';
import {showMeals, showLoadingStatusMeals, updateMeal} from '../actions/cook.actions';
import {changePageCookMeals} from '../actions/ui.actions';
import {infoToast, serverErrorToast} from '../toasts/toasts';

export function getMealsAPI(cookId, page = 1) {
    return async (dispatch) => {
        try{
            dispatch(changePageCookMeals(page));
            dispatch(showLoadingStatusMeals());
            let response = await axios.get(`${BACKEND_API}/cook/meals/${cookId}?page=${page}`);
            if(response.data.meals){
                let pages = response.data.pages?response.data.pages:null;
                dispatch(showMeals({meals:response.data.meals, pages:pages}));
            }else{
                dispatch(showMeals({meals:[], pages:[]}));
            }
        }catch(err){
            console.log(err);
        }
    };
};

export function editMealAPI(data, mealId) {
    return async (dispatch) => {
        try{
            let response = await axios.post(`${BACKEND_API}/cook/edit-meal/${mealId}`,{meal:data});
            if(response.data.updatedMeal){
                dispatch(updateMeal(response.data.updatedMeal));
                infoToast("Edited meal!");
            }else{
                serverErrorToast();
            }
        }catch(err){
            console.log(err);
        }   
    };
};

export function deleteMealAPI(mealId, currentPage){
    return async (dispatch) => {
        try{
            let cookId = localStorage.getItem("userId");
            let response = await axios.delete(`${BACKEND_API}/cook/delete-meal/${mealId}/${cookId}?page=${currentPage}`);
            if(response.data.updatedMeals){
                dispatch(showMeals({meals:response.data.updatedMeals, pages:response.data.pages}));
                infoToast("Deleted meal!");
            }else{
                serverErrorToast();
            }
        }catch(err){
            console.log(err);
        }   
    };
};