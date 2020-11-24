import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./toasts.scss";

export function infoToast(text){
    return toast.info(text, {
        autoClose: 1800,
        containerId: "top-center"
    });
};

export function errorToast(text){
    return toast.error(text, {
        autoClose: 3000,
        containerId: "top-center"
    });
};  

export function serverErrorToast(){
    return toast.error("Server error!", {
        autoClose: 1500,
        containerId: "top-center"
    });
};
     