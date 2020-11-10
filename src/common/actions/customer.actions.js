export const PUT_COOKS_IN_STORE = "PUT_COOKS_IN_STORE";

export function putCooksInStore(payload){
    return{
        type:PUT_COOKS_IN_STORE,
        payload
    }
}

