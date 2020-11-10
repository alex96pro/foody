import React from 'react';
//import axios from 'axios';
//import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.js';

function Cook(){
  
    return (
      <div>
        <NavBar isLoggedIn = {true}/>
        <div>
          <h2>Welcome Cook !</h2>
        </div>
      </div>
    );
}

export default Cook;
