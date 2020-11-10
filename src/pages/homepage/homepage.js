import React from 'react';
//import axios from 'axios';
//import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import "./homepage.scss";

function Homepage(){
  
    return (
      <div>
        <NavBar isLoggedIn = {false}/>
        <div className="homepage"> 
          <h1>Welcome to Foody</h1>
        </div>
      </div>
    );
}

export default Homepage;
