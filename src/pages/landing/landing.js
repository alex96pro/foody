import React from 'react';
import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import "./landing.scss";
import CheckMarkIcon from '../../images/check-mark.png';

export default function Landing() {

    return (
        <div className="landing">
            <NavBar isLoggedIn={false}/>
            <div className="landing-description-box">
                <h1>Welcome to Foody!</h1>
                <h2>The place where food preparation is transparent</h2>
                <div className="punchline"><img src={CheckMarkIcon} alt="check mark" className="check-mark-icon"></img>See detailed ingredients of every meal</div>
                <div className="punchline"><img src={CheckMarkIcon} alt="check mark" className="check-mark-icon"></img>Watch cook process</div>
                <div className="punchline"><img src={CheckMarkIcon} alt="check mark" className="check-mark-icon"></img>Order instantly or subscribe for program</div>
            </div>
            <div className="landing-buttons-box">
                <Link className="landing-button" to={{ pathname: '/sign-up', state: { role: 'Customer'} }}>I want to eat</Link>
                <Link className="landing-button" to={{ pathname: '/sign-up', state: { role: 'Cook'} }}>I want to cook</Link>
            </div>
        </div>
    );
};