import React from "react"

export function MoviesCard(props) {
    const [activeClass, setIsActiveClass] = React.useState(false)
    function handleClick() {
        if (props.isActive) {
            props.deleteFavouriteMovie(props.data.movieId);
            setIsActiveClass(false);
        } else {
            props.setFavouriteStatus(props.data)
            setIsActiveClass(true);
        }
    }

    function handleClickDelete() {
        props.deleteFavouriteMovie(props.data, props.data._id)
    }


    return (
        <div className={props.class}>
            <a className="card__image-link" href={props.youTubeLink}>
            <img className="card__image" src={props.src} alt={props.alt}/>
            </a>
            <div className="card__container">
                <p className="card__about">{props.text}</p>
                <button className={(props.toggleBtnClass === 'toggle__select-delete') ? 'toggle__select toggle__select_delete' : (activeClass || props.isActive ? "toggle__select toggle__select_active" : "toggle__select")} alt="Избранное" onClick={(props.toggleBtnClass === 'toggle__select-delete') ? handleClickDelete : handleClick}/>
            </div>
            <p className="card__duration">{props.duration}</p>
        </div>
    )
}   