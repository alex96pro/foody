import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './pages/landing/landing.js';
import Login from './pages/login/login.js';
import SignUp from './pages/signUp/signUp.js';
import Cook from './pages/cook/cook.js';
import Customer from './pages/customer/customer.js';
import Profile from './pages/profile/profile.js';
import customerMeals from './pages/customerMeals/customerMeals';
import Cart from './pages/cart/cart';
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'rodal/lib/rodal.css';
import CookMeals from './pages/cook-meals/cook-meals';

export default function App() {
  
    return (
        <Router>
            <ToastContainer
                enableMultiContainer
                containerId={"top-center"}
                position={toast.POSITION.TOP_CENTER}
            />
            <Route path="/" exact component={Landing}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/sign-up" exact component={SignUp}></Route>
            <Route path="/cook" exact component={Cook}></Route>
            <Route path="/cook-meals/:id" exact component={CookMeals}></Route>
            <Route path="/customer" exact component={Customer}></Route>
            <Route path="/profile/:id" exact component={Profile}></Route>
            <Route path="/customerMeals/:id" exact component={customerMeals}></Route>
            <Route path="/cart" exact component={Cart}></Route>
        </Router>
    );
};
