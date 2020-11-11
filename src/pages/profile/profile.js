import React from 'react';
//import axios from 'axios';
//import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.js';
import ChangePassword from '../../components/ChangePassword/ChangePassword.js';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import Spinner from '../../images/spinner.gif';
import './profile.scss';

function Profile(){

    const [state,setState] = useState({showChangePassword:false});
    const user = useSelector(state => state.profileReducer.user);
    const handleShowChangePassword = () =>{
      setState({showChangePassword:true});
    }
    return (
      <div>
        <NavBar isLoggedIn = {true} role={localStorage.getItem("role")}/>
        {user.fullname?
          <div className="profile">
            <div className="wrapper">
                <h2>Profile page</h2>
                <div className="profile-label">Fullname:</div> 
                {user.fullname}
                <div className="profile-label">Email:</div> 
                {user.email}
                <div className="profile-label">Location:</div> 
                {user.location}
                <div><button className="change-password-button" onClick={handleShowChangePassword}>
                Change Password</button></div>
            </div>
            {state.showChangePassword? <div className="wrapper"><ChangePassword/></div>:null}
          </div>:<div style={{textAlign:"center"}}><img src={Spinner} alt="Loading..." width="900px" height="600px"/></div>
        }
        
      </div>
    ); 
}

export default Profile;
