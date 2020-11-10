import React from 'react';
//import axios from 'axios';
//import {Link} from 'react-router-dom';
import './CookDetails.scss';
import Avatar from '../../images/avatar.png';
function CookDetails(props){
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
          <div><button className="cook-details-button">Details</button></div>
        </div>)}
        
      </div>
    );
}
export default CookDetails;
