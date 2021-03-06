import React from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import CookDetails from '../../components/CookDetails/CookDetails.js';
import './customer.scss';
import { useForm } from 'react-hook-form';
import { useDispatch,useSelector } from 'react-redux';
import {getCooksAPI} from '../../common/api/customer.api';
import Spinner from '../../images/spinner.gif';
import Paging from '../../components/Paging/paging';

export default function Customer() {

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const cooks = useSelector(state => state.customerReducer.cooks);
    const pages = useSelector(state => state.customerReducer.pagesCooks);
    const loadingStatus = useSelector(state => state.customerReducer.loadingStatus);
    const searchedLocation = useSelector(state => state.customerReducer.searchedLocation);

    const searchByLocation = (data) => {
      dispatch(getCooksAPI(data.address));
    };

    const changePage = (page) => {
      dispatch(getCooksAPI(searchedLocation, page));
    };

    return (
        <div className="customer">
            <NavBar isLoggedIn={true} role={localStorage.getItem("role")}/>
            <div className="wrapper">
                <h2>Welcome Customer !</h2>
                <form onSubmit={handleSubmit(searchByLocation)}>
                    Search cooks by location
                    <input
                    type="text"
                    name="address"
                    ref={register({required:true})}
                    />
                    {errors.address && <p>Address is required</p>}
                    <button type="submit" className="button-main">Search</button>
                </form>
            </div>
            {loadingStatus?<div className="spinner"><img src={Spinner} alt="Loading..."/></div>:
            <CookDetails cooks={cooks}/>}
            {pages.length > 1 && <Paging pages={pages} changePage={changePage} type="currentPageCustomerCooks"/>}
        </div>
    );
};
