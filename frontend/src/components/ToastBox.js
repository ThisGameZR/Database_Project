import React, { useState } from 'react'
import {Toast} from 'react-bootstrap'

const toast = localStorage.getItem("loginForm.toast");
export default function ToastBox({message}) {
    const [show,setShow] = useState(true);
    console.log(toast,show);

    function closeToast(){
        setShow(false);
        localStorage.setItem("loginForm.toast", JSON.stringify(false));
    }
    if(toast == "true"){
        return (
            <div>
                <Toast onClose={() => closeToast()} style={{position:"absolute",top:0,right:"45%"}} show={show} delay={3000} autohide>
                    <Toast.Header>
                        Notification
                    </Toast.Header>
                    <Toast.Body>
                        {message}
                    </Toast.Body>
                </Toast>
            </div>
        )
    }
    return(
        <>
        </>
    );
}
