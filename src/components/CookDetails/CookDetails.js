import React from 'react';
import './CookDetails.scss';
import Avatar from '../../images/avatar.png';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { rateCookAPI } from '../../common/api/customer.api';
import RateCookModal from './rateCook.modal';

export default function CookDetails(props) {
    
    const dispatch = useDispatch();
    const [state,setState] = useState({openModal:false, selectedCook:{}});
    const history = useHistory();

    const showMeals = (cookId) => {
        history.push(`/customerMeals/${cookId}`);
    };

    const onSubmitRating = (data) => {
        dispatch(rateCookAPI(data, state.selectedCook));
        setState({openModal:false, selectedCook:{}});
    };

    const closeRatingModal = () => {
        setState({openModal:false, selectedCook:{}});
    };

    const showRatingModal = (cook) => {
        setState({openModal:true, selectedCook:cook});
    };

    return (
        <div className="cook-details">
            {props.cooks.map(cook => 
                <div key={cook.userId} className="cook-container">
                    <img src={Avatar} className="cook-profile-photo" alt="Avatar"/>
                    <div>Fullname:</div>
                        {cook.fullname}
                    <div>Rating:</div>
                        {cook.rating?(cook.rating).toFixed(2):'No rating yet'}
                        {!props.landing && <button onClick={() => showRatingModal(cook)} className="rate-button">Rate</button>}
                    <div>Location:</div>
                        {cook.location}
                    <div>
                        <button className="button-main" onClick={() =>
                            showMeals(cook.userId)}>Meals</button>
                    </div>
                </div>
            )}
            {state.openModal &&
            <RateCookModal
            openModal={state.openModal}
            closeRatingModal={closeRatingModal}
            selectedCook={state.selectedCook}
            onSubmitRating={onSubmitRating}
            />}
        </div>
    );
};
