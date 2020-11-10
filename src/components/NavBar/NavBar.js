
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './NavBar.scss';
import {useDispatch} from 'react-redux';
import {viewProfile, logout} from '../../common/actions/profile.actions';
import CartIcon from '../../images/shopping-cart.png';
function NavBar(props){

  const dispatch = useDispatch();

  const handleProfile = () =>{
    axios.get('/auth/profile',{headers:{'Authorization':`Basic ${localStorage.getItem("loginToken")}`}})
      .then(response =>{
        dispatch(viewProfile(response.data));
      })
      .catch(error =>{
          console.log(error);
      })
  }
  const handleLogout = () =>{
    dispatch(logout());
    localStorage.clear();
  }
  
    const LoginLink = <Link to="/login" className="navLink">Log In</Link>;
    const RegisterLink = <Link to="/register" className="navLink">Register</Link>;
    const ProfileLink = <Link to="/profile" onClick={handleProfile} className="navLink">Profile</Link>;
    const LogoutLink = <Link to="/" onClick={handleLogout} className="navLink">Logout</Link>;
    const CartLink = <Link to="/cart" className="navLink"><img src={CartIcon} height="30px" width="30px" alt="cart icon"/></Link>

    return (
        <nav>
          {props.role==="CUSTOMER"?<div>{CartLink}</div>:null}
          {props.isLoggedIn?
          <div>{ProfileLink}{LogoutLink}</div>:
          <div>{LoginLink}{RegisterLink}</div>}
        </nav>
    );
}

export default NavBar;
