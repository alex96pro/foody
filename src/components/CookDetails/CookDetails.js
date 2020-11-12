import React from 'react';
import axios from 'axios';
import './CookDetails.scss';
import Avatar from '../../images/avatar.png';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { putSelectedMealsInStore } from '../../common/actions/customer.actions';

import Modal from 'react-modal';
Modal.setAppElement('#root'); //da ne izbacuje gresku u konzoli za modal

export default function CookDetails(props){
    
    const dispatch = useDispatch();
    const [state,setState] = useState({openModal:false, selectedCook:{}})
    const {register, handleSubmit, errors} = useForm();
    const handleShowMeals = (userId) =>{
    axios.get(`/customer/meals/`+userId)
        .then(response=>{
          dispatch(putSelectedMealsInStore(response.data));
        })
        .catch(error => {
          console.log(error);
      })
    };
    const onSubmitRating = (data) =>{
      console.log(data.rating+" "+data.description);
      axios.post(`/customer/rate`,
      {cookId:state.selectedCook.userId, customerId:localStorage.getItem("userId"),rating:data.rating,description:data.description})
      .then(response => {
        if(response.data ==="RATED"){
          setState({openModal:false, selectedCook:{}});
        }else if(response.data === "ALREADY_RATED"){
          setState({openModal:false, selectedCook:{}});
          alert("You already rated this cook!");
        }
      })
      .catch(error => {
          console.log(error);
      })
      
    };
    const cancelModal = () =>{
      setState({openModal:false, selectedCook:{}});
    };
    const showRatingModal = (cook)=>{
      setState({openModal:true, selectedCook:cook})
    }
    return (
      <div className="cook-details">
        {props.cooks.map(cook => 
        <div key={cook.userId} className="wrapper animate-cook-details">
          <img src={Avatar} width="30px" height="30px" alt="Avatar"/>
          <div>Fullname:</div>
            {cook.fullname}
          <div>Rating:</div>
            {cook.rating?(cook.rating).toFixed(2):'No rating yet'}<button onClick={()=>showRatingModal(cook)} className="rate-button">Rate</button>
          <div>Location:</div>
            {cook.location}
          <div><Link to="/customerMeals" >
                <button className="cook-details-button" onClick={()=>handleShowMeals(cook.userId)}>Show meals</button>
              </Link>
          </div>
        </div>)}

        <Modal isOpen={state.openModal} onRequestClose={()=>setState({openModal:false,selectedCook:{}})} className="modal-rate-cook">
              <div><h2>{state.selectedCook.fullname}</h2></div>
                <form onSubmit={handleSubmit(onSubmitRating)}>
                  <div>Rating (1 to 5)</div>
                    <select name="rating" ref={register()}>
                      <option value="5">5</option>
                      <option value="4">4</option>  
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                  <div>Description</div>
                  <textarea name="description" ref={register()}/>
                  <button className="modal-rate-cook-cancel-button" onClick={cancelModal}>Cancel</button>
                  <button type="submit" className="modal-rate-cook-button">Rate</button>
                </form>
                
        </Modal>
      </div>
    );
}
