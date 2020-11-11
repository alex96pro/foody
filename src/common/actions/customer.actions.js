export const PUT_COOKS_IN_STORE = "PUT_COOKS_IN_STORE";
export const PUT_SELECTED_MEALS_IN_STORE = "PUT_SELECTED_MEALS_IN_STORE";

export function putCooksInStore(payload){
    return{
        type:PUT_COOKS_IN_STORE,
        payload
    }
}
export function putSelectedMealsInStore(payload){
    return{
        type:PUT_SELECTED_MEALS_IN_STORE,
        payload
    }
}

