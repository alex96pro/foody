export const COOK_SHOW_MEALS = "COOK_SHOW_MEALS";
export const SHOW_LOADING_STATUS_MEALS = "SHOW_LOADING_STATUS_MEALS";
export const UPDATE_MEAL = "UPDATE_MEAL";

export function showMeals(payload){
    return{
        type:COOK_SHOW_MEALS,
        payload
    };
};
export function showLoadingStatusMeals(){
    return{
        type:SHOW_LOADING_STATUS_MEALS
    };
};
export function updateMeal(payload){
    return{
        type:UPDATE_MEAL,
        payload
    };
};