import React from "react";

export function MoviesCard(props) {
    const [isActive, setActive] = React.useState(false);
    function handleToggle() {
        if (isActive) {
            setActive(false);
        } else {
            setActive(true);
        }
    }
    return (
        <div className="card">
            <img className="card__image" src={props.src} alt={props.alt}/>
            <div className="card__container">
                <p className="card__about">{props.text}</p>
                <button className={isActive ? "card__toggle card__toggle_active" : "card__toggle"} alt="Избранное" onClick={handleToggle}/>
            </div>
            <p className="card__duration">{props.duration}</p>
        </div>
    )
}