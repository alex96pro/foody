import React from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import './cook.scss';

export default function Cook(props) {

    const showMeals = () => {
        props.history.push(`/cook-meals/${localStorage.getItem("userId")}?page=1`);
    };

    return (
        <div className="cook">
            <NavBar isLoggedIn={true} role={localStorage.getItem("role")}/>
            <h1>Welcome Cook !</h1>
            <div className="cook-nav">
                <button onClick={showMeals} className="button-main">My meals</button>
                <button className="button-main">My orders</button>
            </div>
        </div>
    );
};
