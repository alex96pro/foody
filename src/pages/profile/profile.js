import React, { useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import ChangePassword from '../../components/ChangePassword/ChangePassword.js';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import Spinner from '../../images/spinner.gif';
import {profileAPI} from '../../common/api/auth.api';
import './profile.scss';

export default function Profile() {

    const [state, setState] = useState({showChangePassword:false});
    const user = useSelector(state => state.profileReducer.user);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(profileAPI());
    }, []);

    const handleShowChangePassword = () => {
      setState({showChangePassword:true});
    };

    return (
        <div className="profile">
            <NavBar isLoggedIn={true} role={localStorage.getItem("role")}/>
            {user.loadingStatus?
            <div className = "spinner"><img src={Spinner} alt="Loading..."/></div>:
            <div className="wrapper">
                <h2>Profile</h2>
                <div className="profile-label">Fullname:</div> 
                {user.fullname}
                <div className="profile-label">Email:</div> 
                {user.email}
                <div className="profile-label">Location:</div> 
                {user.location}
                <div className="profile-label">Profile photo:</div>
                {user.profilePhoto !== "no" ?
                <img src={user.profilePhoto} alt="Profile" width="200px" height="200px"/>:
                <div>No profile image<button>Add</button></div>
                }
                
                <div><button className="change-password-button" onClick={handleShowChangePassword}>
                Change Password</button></div>
            </div>
            }
            {state.showChangePassword && <div className="wrapper"><ChangePassword/></div>}
        </div>
    ); 
};
