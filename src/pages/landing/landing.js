import React from 'react';
import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import "./landing.scss";
import CheckMarkIcon from '../../images/check-mark.png';
export default function Landing(){
  
    return (
      <div>
        <NavBar isLoggedIn={false}/>
        <div className="landing">
          <div className="landing-description-box">
            <h1>Welcome to Foody!</h1>
            <h2>The place where food preparation is transparent</h2>
            <h3><img src={CheckMarkIcon} alt="check mark" width="30px" height="30px"></img>See detailed ingredients of every meal</h3>
            <h3><img src={CheckMarkIcon} alt="check mark" width="30px" height="30px"></img>Watch cook process</h3>
            <h3><img src={CheckMarkIcon} alt="check mark" width="30px" height="30px"></img>Enjoy your food</h3>
          </div>
          <div className="landing-buttons">
            <Link className="landing-button" to={{ pathname: '/sign-up', state: { role: 'Customer'} }}>I want to eat</Link>
            <Link className="landing-button" to={{ pathname: '/sign-up', state: { role: 'Cook'} }}>I want to cook</Link>
          </div>
        </div>
      </div>
    );
};