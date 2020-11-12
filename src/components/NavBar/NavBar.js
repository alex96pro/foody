
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './NavBar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { viewProfile, logout } from '../../common/actions/profile.actions';
import CartIcon from '../../images/shopping-cart.png';


export default function NavBar(props){

  const dispatch = useDispatch();
  const numberOfMealsInCart = useSelector(state=>state.cartReducer.meals.length);
  const handleProfile = () =>{
    axios.get(`/auth/profile`,{headers:{'Authorization':`Basic ${localStorage.getItem("loginToken")}`}})
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
  
    const LoginLink = <Link to="/login" className="nav-link">Log In</Link>;
    const RegisterLink = <Link to="/register" className="nav-link">Register</Link>;
    const ProfileLink = <Link to="/profile" onClick={handleProfile} className="nav-link">Profile</Link>;
    const LogoutLink = <Link to="/" onClick={handleLogout} className="nav-link">Logout</Link>;
    const CartLink = <Link to="/cart" className="nav-link"><img src={CartIcon} height="20px" width="25px" alt="cart icon"/></Link>;
    const HomeForCook = <Link to="/cook" className="nav-link">Home</Link>
    const HomeForCustomer = <Link to="/customer" className="nav-link">Home</Link>
    return (
        <nav>
          {(props.isLoggedIn && props.role==="CUSTOMER")?
          <div>{HomeForCustomer}{numberOfMealsInCart===0?null:numberOfMealsInCart}{CartLink}</div>:null}
          {(props.isLoggedIn && props.role==="COOK")?
          <div>{HomeForCook}</div>:null}
          {props.isLoggedIn?
          <div>{ProfileLink}{LogoutLink}</div>:
          <div>{LoginLink}{RegisterLink}</div>}
          
          
        </nav>
    );
}
