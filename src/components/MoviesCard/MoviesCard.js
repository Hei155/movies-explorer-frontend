import React from "react";

export function MoviesCard(props) {

    function handleClick() {
        if (props.isActive) {
            console.log(props.data.id)
            props.deleteFavouriteMovie(props.data.id)
        } else {
            props.setFavouriteStatus(props.data)
        }
    }

    function handleClickDelete() {
        props.deleteFavouriteMovie(String(props.data.movieId))
    }



    return (
        <div className={props.class}>
            <img className="card__image" src={props.src} alt={props.alt}/>
            <div className="card__container">
                <p className="card__about">{props.text}</p>
                <button className={(props.toggleBtnClass === 'toggle__select-delete') ? 'toggle__select toggle__select_delete' : (props.isActive ? "toggle__select toggle__select_active" : "toggle__select")} alt="Избранное" onClick={(props.toggleBtnClass === 'toggle__select-delete') ? handleClickDelete : handleClick}/>
            </div>
            <p className="card__duration">{props.duration}</p>
        </div>
    )
}   