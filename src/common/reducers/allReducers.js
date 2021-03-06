import customerReducer from './customer.reducer';
import cookReducer from './cook.reducer';
import profileReducer from './profile.reducer';
import cartReducer from './cart.reducer';
import uiReducer from './ui.reducer';
import {combineReducers} from 'redux';
import {LOGOUT} from '../actions/profile.actions';

const allReducers = combineReducers(
    {
        uiReducer,
        customerReducer,
        cookReducer,
        profileReducer,
        cartReducer
    }
);

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
      state = undefined;
    }
    return allReducers(state, action);
};

export default rootReducer;