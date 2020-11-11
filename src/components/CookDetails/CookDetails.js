import React from 'react';
import axios from 'axios';
import './CookDetails.scss';
import Avatar from '../../images/avatar.png';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { putSelectedMealsInStore } from '../../common/actions/customer.actions';

export default function CookDetails(props){
    
    const dispatch = useDispatch();
    const handleShowMeals = (userId) =>{
      axios.get("/customer/meals/"+userId)
        .then(response=>{
          dispatch(putSelectedMealsInStore(response.data));
        })
        .catch(error => {
          console.log(error);
      })
    }
    return (
      <div className="cook-details">
        {props.cooks.map(cook => 
        <div key={cook.userId} className="wrapper animate-cook-details">
          <img src={Avatar} width="30px" height="30px" alt="Avatar"/>
          <div>Fullname:</div>
            {cook.fullname}
          <div>Rating:</div>
            {cook.rating}
          <div>Location:</div>
            {cook.location}
          <div><Link to="/customerMeals" >
                <button className="cook-details-button" onClick={()=>handleShowMeals(cook.userId)}>Meals</button>
              </Link>
          </div>
        </div>)}
        
      </div>
    );
}
