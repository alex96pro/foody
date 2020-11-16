import { BACKEND_API } from '../../consts.js';
import axios from 'axios';
import {putCooksInStore, loadingCooks, noCooksOnLocation, loadingMeals, putSelectedMealsInStore} from '../actions/customer.actions'; 

export function getCooksAPI(data){
    return (dispatch) => {
        dispatch(loadingCooks());
        axios.post(`${BACKEND_API}/customer/searchCooksByLocation`,{searchValue:data.address})
      .then(response =>{
        if(response.data !== null){
          dispatch(putCooksInStore(response.data));
        }else{
          dispatch(noCooksOnLocation(data.address));
        }
      })
      .catch(error =>{
        console.log(error);
      })
    }
};

export function getMealsAPI(userId){
  return (dispatch) => {
    dispatch(loadingMeals());
      axios.get(`${BACKEND_API}/customer/meals/`+userId)
      .then(response=>{
        dispatch(putSelectedMealsInStore(response.data));
      })
      .catch(error => {
        console.log(error);
      })
  }
};

export function rateCookAPI(data, selectedCook){
    axios.post(`${BACKEND_API}/customer/rate`,
    {cookId:selectedCook.userId, customerId:localStorage.getItem("userId"),rating:data.rating,description:data.description})
    .then(response => {
      if(response.data ==="RATED"){
        alert("Rated successfully !");
      }else if(response.data === "ALREADY_RATED"){
        alert("You already rated this cook!");
      }
    })
    .catch(error => {
        console.log(error);
    })
};