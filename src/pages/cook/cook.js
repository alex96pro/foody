import React from 'react';
import NavBar from '../../components/NavBar/NavBar.js';

export default function Cook(){
  
    return (
      <div>
        <NavBar isLoggedIn={true} role={localStorage.getItem("role")}/>
        <div>
          <h2>Welcome Cook !</h2>
        </div>
      </div>
    );
};
