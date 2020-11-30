export const CHANGE_PAGE_CUSTOMER_COOKS = "CHANGE_PAGE_CUSTOMER_COOKS";
export const CHANGE_PAGE_CUSTOMER_MEALS = "CHANGE_PAGE_CUSTOMER_MEALS";
export const CHANGE_PAGE_COOK_MEALS = "CHANGE_PAGE_COOK_MEALS";
export const PICKED_REGISTER_ROLE = "CHOSEN_REGISTER_ROLE";
export const GET_FEATURED_COOKS = "GET_FEATURED_COOKS";

export function changePageCustomerCooks(payload){
    return{
        type:CHANGE_PAGE_CUSTOMER_COOKS,
        payload
    }
};

export function changePageCustomerMeals(payload){
    return{
        type:CHANGE_PAGE_CUSTOMER_MEALS,
        payload
    }
};

export function changePageCookMeals(payload){
    return{
        type:CHANGE_PAGE_COOK_MEALS,
        payload
    }
};

export function pickedRegisterRole(payload){
    return{
        type:PICKED_REGISTER_ROLE,
        payload
    }
}

export function getFeaturedCooks(payload){
    return{
        type:GET_FEATURED_COOKS,
        payload
    }
}