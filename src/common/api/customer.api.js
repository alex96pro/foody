import { BACKEND_API } from '../../consts.js';
import axios from 'axios';
import {putCooksInStore, loadingCooks, noCooksOnLocation, loadingMeals, putSelectedMealsInStore, updateRatedCook} from '../actions/customer.actions'; 
import {changePageCustomerCooks, changePageCustomerMeals} from '../actions/ui.actions';
import {infoToast, errorToast, serverErrorToast} from '../toasts/toasts';

export function getCooksAPI(searchedLocation, page = 1){
    return async (dispatch) => {
      try{
        dispatch(loadingCooks());
        let response = await axios.get(`${BACKEND_API}/customer/cooks/${searchedLocation}?page=${page}`);
        if(response.data.cooks){
            let pages = response.data.pages?response.data.pages:null;
            dispatch(changePageCustomerCooks(page));
            dispatch(putCooksInStore({cooks:response.data.cooks, pages:pages,searchedLocation:searchedLocation}));
        }else{
            dispatch(changePageCustomerCooks(page));
            dispatch(noCooksOnLocation(searchedLocation));
            errorToast(`No cooks on location "${searchedLocation}"`);  
        }
      }catch(err){
        serverErrorToast();
        console.log(err);
      }
    };
};

export function getMealsAPI(cookId, page = 1, name="", filters = "", priceSort = ""){
    return async (dispatch) => {
      try{
        dispatch(changePageCustomerMeals(page));
        dispatch(loadingMeals());
        let response = await axios.get(`${BACKEND_API}/customer/meals/${cookId}?page=${page}&name=${name}&filters=${filters}&priceSort=${priceSort}`);
        if(response.data.meals){
          let pages = response.data.pages?response.data.pages:null;
          dispatch(putSelectedMealsInStore({meals:response.data.meals, pages:pages, cookId:cookId}));
        }else{
          dispatch(putSelectedMealsInStore({meals:[], pages:[]}));
          infoToast("No meals :(");
        }
      }catch(err){
        serverErrorToast();
        console.log(err);
      }
    };
};

export function rateCookAPI(data, selectedCook){
    return async (dispatch) => {
        try{
            let response = await axios.post(`${BACKEND_API}/customer/rate`,
            {cookId:selectedCook.userId, customerId:localStorage.getItem("userId"),rating:data.rating,description:data.description})
              if(response.data.updatedCook){
                infoToast("Rated successfuly!");
                dispatch(updateRatedCook(response.data.updatedCook));
              }else{
                errorToast("You already rated this cook!");
              }
          }catch(err){
            serverErrorToast();
            console.log(err);
          } 
    }
    
};