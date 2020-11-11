export const PUT_MEAL_IN_CART = "PUT_MEAL_IN_CART";

export function putMealInCart(payload){
    return {
        type: PUT_MEAL_IN_CART,
        payload
    }
}