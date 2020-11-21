import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./toasts.scss";

export function addToCartToast(){
    return toast.info("Added to cart!", {
        autoClose: 1500,
        containerId: "top-center"
    });
};

export function removeFromCartToast(){
    return toast.info("Removed from cart!", {
        autoClose: 1500,
        containerId: "top-center"
    });
};

export function noCooksOnLocationToast(location){
    console.log(123);
    return toast.info(`No cooks on location '${location}'`, {
        autoClose: 2000,
        containerId: "top-center"
    });
};

export function alreadyRatedToast(){
    return toast.error("You already rated this cook!", {
        autoClose: 2000,
        containerId: "top-center"
    });
};  

export function successRatedToast(){
    return toast.info("Rated successfuly!", {
        autoClose: 1500,
        containerId: "top-center"
    });
};

export function successEditMealToast(){
    return toast.info("Meal edited!", {
        autoClose: 1500,
        containerId: "top-center"
    });
};

export function serverErrorToast(){
    return toast.error("Server error!", {
        autoClose: 1500,
        containerId: "top-center"
    });
};
     