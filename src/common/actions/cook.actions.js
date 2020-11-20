export const COOK_SHOW_MEALS = "COOK_SHOW_MEALS";
export const SHOW_LOADING_STATUS_MEALS = "SHOW_LOADING_STATUS_MEALS"
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