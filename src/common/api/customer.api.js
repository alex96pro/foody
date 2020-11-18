import { BACKEND_API } from '../../consts.js';
import axios from 'axios';
import {putCooksInStore, loadingCooks, noCooksOnLocation, loadingMeals, putSelectedMealsInStore} from '../actions/customer.actions'; 
import {changePageCustomerCooks, changePageCustomerMeals} from '../actions/ui.actions';

export function getCooksAPI(data){
    return async (dispatch) => {
      try{
        dispatch(loadingCooks());
        let response = await axios.get(`${BACKEND_API}/customer/searchCooksByLocation/${data.address}`);
        if(response.data !== null){
          dispatch(putCooksInStore({cooks:response.data.cooks, pages:response.data.pages,searchedLocation:data.address, pageNumberCooks:1}));
        }else{
          dispatch(noCooksOnLocation(data.address));
        }
      }catch(err){
        console.log(err);
      }
    };
};

export function changeCooksPageAPI(page, searchedLocation){
    return async (dispatch) => {
      try{
        dispatch(changePageCustomerCooks(page));
        dispatch(loadingCooks());
        let response = await axios.get(`${BACKEND_API}/customer/changeCooksByLocationPage/page/${page}/location/${searchedLocation}`)
        if(response.data !== null){
          dispatch(putCooksInStore({cooks:response.data, searchedLocation:searchedLocation, pageNumberCooks:page}));
        }else{
          dispatch(noCooksOnLocation(searchedLocation));
        }
      }catch(err){
        console.log(err);
      }    
    };
};

export function getMealsAPI(cookId){
    return async (dispatch) => {
      try{
        dispatch(loadingMeals());
        let response = await axios.get(`${BACKEND_API}/customer/meals/`+cookId)
        if(response.data !== "NO_MEALS"){
          dispatch(putSelectedMealsInStore({meals:response.data.meals, pages:response.data.pages, cookId:cookId}));
        }else{
          dispatch(putSelectedMealsInStore({meals:[], pages:[], cookId:0}));
        }
      }catch(err){
        console.log(err);
      }
    };
};

export function changeMealsPageAPI(page, selectedCookId){
    return async (dispatch) => {
      try{
        dispatch(changePageCustomerMeals(page));
        dispatch(loadingMeals());
        let response = await axios.get(`${BACKEND_API}/customer/meals/`+selectedCookId+'/page/'+page)
        dispatch(putSelectedMealsInStore({meals:response.data, cookId:selectedCookId}));
      }catch(err){
        console.log(err);
      } 
    };
};

export async function rateCookAPI(data, selectedCook){
    try{
      let response = await axios.post(`${BACKEND_API}/customer/rate`,
      {cookId:selectedCook.userId, customerId:localStorage.getItem("userId"),rating:data.rating,description:data.description})
        if(response.data ==="RATED"){
          alert("Rated successfully !");
        }else if(response.data === "ALREADY_RATED"){
          alert("You already rated this cook!");
        }
    }catch(err){
      console.log(err);
    } 
};