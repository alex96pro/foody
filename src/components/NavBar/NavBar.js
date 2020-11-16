
import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.scss';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../common/actions/profile.actions';
import CartIcon from '../../images/shopping-cart.png';
import {profileAPI} from '../../common/api/auth.api';

export default function NavBar(props){

    const dispatch = useDispatch();
    const numberOfMealsInCart = useSelector(state => state.cartReducer.meals.length);
  
    const profile = () => {
      dispatch(profileAPI());
    };

    const handleLogout = () => {
      dispatch(logout());
      localStorage.clear();
    };

    return (
        <nav className="nav-bar">
          {(props.isLoggedIn && props.role==="CUSTOMER")&&
          <div><Link to="/customer" className="nav-link">Home</Link>
          {numberOfMealsInCart!==0 && numberOfMealsInCart}<Link to="/cart" className="nav-link"><img src={CartIcon} className="cart-icon" alt="Cart icon"/></Link></div>}

          {(props.isLoggedIn && props.role==="COOK") && <div><Link to="/cook" className="nav-link">Home</Link></div>}

          {props.isLoggedIn?
          <div><Link to="/profile" onClick={profile} className="nav-link">Profile</Link><Link to="/" onClick={handleLogout} className="nav-link">Logout</Link></div>
          :<div><Link to="/login" className="nav-link">Log In</Link></div>}
        </nav>
    );
};
