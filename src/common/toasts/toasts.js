import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./toasts.scss";

export function infoToast(text, time = 1800){
    return toast.info(text, {
        autoClose: time,
        containerId: "top-center"
    });
};

export function errorToast(text, time = 3000){
    return toast.error(text, {
        autoClose: time,
        containerId: "top-center"
    });
};  

export function serverErrorToast(){
    return toast.error("Server error!", {
        autoClose: 1500,
        containerId: "top-center"
    });
};
     