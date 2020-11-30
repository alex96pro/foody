import { BACKEND_API } from '../../consts.js';
import axios from 'axios';
import { getFeaturedCooks } from '../actions/ui.actions';

export function getFeaturedCooksAPI() {
    return async (dispatch) => {
        try{
            let response = await axios.get(`${BACKEND_API}/ui/featuredCooks`);
            if(response.data.length > 0){
                dispatch(getFeaturedCooks(response.data));
            }else{
                dispatch(getFeaturedCooks([]));
            }
        }catch(err){
            console.log(err);
        }
    };
};