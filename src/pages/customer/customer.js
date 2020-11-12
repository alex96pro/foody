import React from 'react';
import axios from 'axios';
//import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.js';
import CookDetails from '../../components/CookDetails/CookDetails.js';
import './customer.scss';
import {putCooksInStore} from '../../common/actions/customer.actions';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';

export default function Customer(props){

  const {register, handleSubmit, errors} = useForm();
  const [state,setState] = useState({message:''});
  const dispatch = useDispatch();
  const cooks = useSelector(state=>state.customerReducer.cooks);
  
  const onSubmit = (data) =>{
      axios.post(`/customer/searchCooksByLocation`,{searchValue:data.address})
      .then(response =>{
        if(response.data !== null){
          dispatch(putCooksInStore(response.data));
          setState({message:""});
        }else{
          setState({message:"No cooks on location '"+data.address+"'"});
        }
      })
      .catch(error =>{
        console.log(error);
      })
    };
    return (
      <div>
        <NavBar isLoggedIn = {true} role={localStorage.getItem("role")}/>
        <div className="customer">
          <div className="wrapper">
            <h2>Welcome Customer !</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              Search cooks by location
              <input
              type="text"
              name="address"
              ref={register({required:true})}
              />
              {errors.address && <p>Address is required</p>}
              <button type="submit" className="customer-button">Search</button>
            </form>
            <div className="message-danger">{state.message}</div>
          </div>
        </div>
        {cooks?<CookDetails cooks={cooks}/>:null}
      </div>
    );
}
