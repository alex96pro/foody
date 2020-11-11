import customerReducer from './customer.reducer';
import profileReducer from './profile.reducer';
import cartReducer from './cart.reducer';
import {combineReducers} from 'redux';
import {LOGOUT} from '../actions/profile.actions';

const allReducers = combineReducers(
    {
        customerReducer,
        profileReducer,
        cartReducer
    }
)
const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
      state = undefined;
    }
    return allReducers(state, action);
}

export default rootReducer;