import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import "./landing.scss";
import CheckMarkIcon from '../../images/check-mark.png';
import { getFeaturedCooksAPI } from '../../common/api/ui.api';
import { pickedRegisterRole } from '../../common/actions/ui.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Carousel from '../../components/Carousel/carousel';
import Spinner from '../../images/spinner.gif';

export default function Landing() {

    const dispatch = useDispatch();
    const featuredCooks = useSelector(state => state.uiReducer.featuredCooks);

    useEffect(() => {
        if(!featuredCooks.length){
            dispatch(getFeaturedCooksAPI());
        }
    }, [featuredCooks, dispatch]);

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
                <Link className="landing-button" to='/sign-up' onClick={() => dispatch(pickedRegisterRole('Customer'))}>I want to eat</Link>
                <Link className="landing-button" to='/sign-up' onClick={() => dispatch(pickedRegisterRole('Cook'))}>I want to cook</Link>
            </div>
            <div className="landing-cooks-header">Most popular cooks</div>
            {featuredCooks.length ?
                <Carousel items={featuredCooks}/>:
            <div className = "spinner"><img src={Spinner} alt="Loading..."></img></div>}
        </div>
    );
};