import React from 'react';
import './carousel.scss';
import LeftArrow from '../../images/arrow-to-left.png';
import RightArrow from '../../images/arrow-to-right.png';
import Avatar from '../../images/avatar.png';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function Carousel(props) {

    const [x, setX] = useState(0);
    const [numberOfItems, setNumberOfItems] = useState(0);
    const [move, setMove] = useState(0);
    const [handleForAnimation, setHandleForAnimation] = useState({});
    
    useEffect(() => {
        let media = window.matchMedia('(max-width:450px)');
        if(media.matches){
            setNumberOfItems(1);
        }else{
            media = window.matchMedia('(max-width:600px)');
            if(media.matches){
                setNumberOfItems(3);
            }else{
                setNumberOfItems(5);
            }
        }
        let handle = setInterval(() => {
            if(document.getElementById('carousel-right-button') !== null){
                document.getElementById('carousel-right-button').click(); //TEMPORARY UNTILL I PUT ACTIONS ON USER CLICKS
            }
        },2500);
        setHandleForAnimation(handle);
    }, []);

    useEffect(() => {
        return () => {
            clearInterval(handleForAnimation);
        };
    }, [handleForAnimation]);

   
    
    const moveLeft = () => {
        if(move === 0){
            setMove(props.items.length-numberOfItems);
            setX(x-100*(props.items.length-numberOfItems));
        }else{
            setMove(move-1);
            setX(x+100);
        }
    };

    const moveRight = () => {
        if(move === props.items.length - numberOfItems){
            setMove(0);
            setX(0);
        }else{
            setMove(move+1);
            setX(x-100);
        }
    };
    
    return (
        <div className="carousel">
            {props.items.map((item,index) =>
                <div className="carousel-item" key={index} style={{transform:`translateX(${x}%)`}}> 
                    <div><img src={Avatar} alt="avatar" width="30px" height="30px"></img></div>
                    <div>{item.fullname}</div>
                    <div>City:{' '+item.location}</div>
                    <div>Rating:{' '+item.rating.toFixed(2)}</div>
                    <Link to="/login" className="button-small-inverse">Meals</Link>
                </div>
            )}
            <button className="carousel-button-left" onClick={moveLeft}><img src={LeftArrow} alt="left" width="10px" height="10px"></img></button>
            <button className="carousel-button-right" onClick={moveRight} id="carousel-right-button"><img src={RightArrow} alt="right" width="10px" height="10px"></img></button>
        </div>
    );
};