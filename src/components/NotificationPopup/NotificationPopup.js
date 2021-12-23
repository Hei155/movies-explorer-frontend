import React from "react"

export function NotificationPopup(props) {
    function handleCloseOnArea(evt) {
        if (evt.target.className === 'popup') {
            props.setIsClose(true)
        } 
    }

    function handleClose() {
        props.setIsClose(true) 
    }

    return (
        <section className={props.isClose ? 'popup' : 'popup popup_open'} onClick={handleCloseOnArea}>
            <div className="popup__container">
                <button className="popup__close" onClick={handleClose}/>
                <span className="popup__text">Вы успешно зарегистрировались!</span>
            </div>
        </section>
    )
}