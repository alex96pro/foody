import React from 'react';
import './paging.scss';
import { useSelector } from 'react-redux';

export default function Paging(props){

    const currentPage = useSelector(state => {
        switch(props.type){
            case 'currentPageCustomerCooks':
                return state.uiReducer.currentPageCustomerCooks;
            case 'currentPageCustomerMeals':
                return state.uiReducer.currentPageCustomerMeals;
            default: return 1;
        }   
    });

    return(
        <div className="paging">
            {props.pages.map((page,index) =>
            <button key={index} onClick={() => props.changePage(page)} 
            className={page===currentPage?"paging-number active":"paging-number"}>{page}</button>
            )}
        </div>
    );
};