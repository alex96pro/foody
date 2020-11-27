export const PUT_COOKS_IN_STORE = "PUT_COOKS_IN_STORE";
export const PUT_SELECTED_MEALS_IN_STORE = "PUT_SELECTED_MEALS_IN_STORE";
export const SET_LOADING_STATUS_COOKS = "SET_LOADING_STATUS_COOKS";
export const NO_COOKS_ON_LOCATION = "NO_COOKS_ON_LOCATION";
export const SET_LOADING_STATUS_MEALS = "SET_LOADING_STATUS_MEALS";
export const UPDATE_RATED_COOK = "UPDATE_RATED_COOK";

export function loadingCooks(){
    return{
        type:SET_LOADING_STATUS_COOKS
    }
};
export function putCooksInStore(payload){
    return{
        type:PUT_COOKS_IN_STORE,
        payload
    }
};
export function noCooksOnLocation(payload){
    return{
        type:NO_COOKS_ON_LOCATION,
        payload
    }
};
export function putSelectedMealsInStore(payload){
    return{
        type:PUT_SELECTED_MEALS_IN_STORE,
        payload
    }
};
export function loadingMeals(){
    return{
        type:SET_LOADING_STATUS_MEALS
    }
};
export function updateRatedCook(payload){
    return{
        type:UPDATE_RATED_COOK,
        payload
    }
}
