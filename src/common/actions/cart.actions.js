export const PUT_MEAL_IN_CART = "PUT_MEAL_IN_CART";
export const REMOVE_MEAL_FROM_CART = "REMOVE_MEAL_FROM_CART";
export function putMealInCart(payload){
    return {
        type: PUT_MEAL_IN_CART,
        payload
    }
}
export function removeMealFromCart(payload){
    return {
        type: REMOVE_MEAL_FROM_CART,
        payload
    }
}