import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Homepage from './pages/homepage/homepage.js';
import Login from './pages/login/login.js';
import Register from './pages/register/register.js';
import Cook from './pages/cook/cook.js';
import Customer from './pages/customer/customer.js';
import Profile from './pages/profile/profile.js';

function App(){
  
    return (
      <Router>
        <div>
          <Route path="/" exact component={Homepage}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/cook" exact component={Cook}></Route>
          <Route path="/customer" exact component={Customer}></Route>
          <Route path="/profile" exact component={Profile}></Route>
        </div>
      </Router>
    );
}

export default App;
