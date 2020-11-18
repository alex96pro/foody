export const CHANGE_PAGE_CUSTOMER_COOKS = "CHANGE_PAGE_CUSTOMER_COOKS";
export const CHANGE_PAGE_CUSTOMER_MEALS = "CHANGE_PAGE_CUSTOMER_MEALS";

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