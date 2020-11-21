import React from 'react';
import './CookDetails.scss';
import Avatar from '../../images/avatar.png';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {getMealsAPI, rateCookAPI} from '../../common/api/customer.api';
import RateCookModal from './rateCook.modal';

export default function CookDetails(props){
    
    const dispatch = useDispatch();
    const [state,setState] = useState({openModal:false, selectedCook:{}});

    const showMeals = (cookId) => {
      dispatch(getMealsAPI(cookId));
    };

    const onSubmitRating = (data) => {
      rateCookAPI(data, state.selectedCook);
      setState({openModal:false, selectedCook:{}});
    };

    const cancelRatingModal = () => {
      setState({openModal:false, selectedCook:{}});
    };

    const showRatingModal = (cook) => {
      setState({openModal:true, selectedCook:cook})
    };

    return (
      <div className="cook-details">
        {props.cooks.map(cook => 
          <div key={cook.userId} className="wrapper animate-cook-details">
              <img src={Avatar} className="cook-profile-photo" alt="Avatar"/>
              <div>Fullname:</div>
                {cook.fullname}
              <div>Rating:</div>
                {cook.rating?(cook.rating).toFixed(2):'No rating yet'}<button onClick={() => showRatingModal(cook)} className="rate-button">Rate</button>
              <div>Location:</div>
                {cook.location}
              <div>
                <Link to="/customerMeals" >
                    <button className="button-main" onClick={() => showMeals(cook.userId)}>Show meals</button>
                </Link>
              </div>
          </div>)}

        {state.openModal &&
        <RateCookModal
          openModal={state.openModal}
          cancelRatingModal={cancelRatingModal}
          selectedCook={state.selectedCook}
          onSubmitRating={onSubmitRating}
        />}
      </div>
    );
};
