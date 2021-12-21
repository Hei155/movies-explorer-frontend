import React from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard"
import { moviesApiBaseUrl } from "../../utils/const";
import { mainApiBaseUrl } from "../../utils/const";
import { useLocation } from "react-router-dom";

export function MoviesCardList(props) { 
    const [currentBaseUrl, setCurrentBaseUrl] = React.useState('');
    const location = useLocation();
    function transformDuration(durationInMinutes) {
        if (Number(durationInMinutes) < 60) {
            return `${durationInMinutes}м`;
        } else if (Number(durationInMinutes) === 60) {
            return `1ч`;
        }
        return `${Math.floor(durationInMinutes / 60)}ч${durationInMinutes % 60}м`
    }

    function checkCards(i) {
        if (i > props.maxCards - 1) {
            return 'card_hidden';
        } else {                                                                        
            return 'card';
        }
    }

    function checkPath() {
        if (location.pathname === '/saved-movies') {
            setCurrentBaseUrl(mainApiBaseUrl);
        } else if (location.pathname === '/movies') {
            setCurrentBaseUrl(moviesApiBaseUrl);
        }
    }

    React.useEffect(() => {
        checkPath();
    }, [])

    return (
        <> 
            {props.checkCurrentCards().map((movie, i) => {
                let currentLink;
                if (location.pathname === '/saved-movies') {
                    currentLink=movie.image;
                } else {
                    currentLink=movie.image.url;
                }
                return (
                    <MoviesCard
                        deleteFavouriteMovie={props.deleteFavouriteMovie}
                        isActive={props.movieSavedList.some(i => i.movieId === movie.id)}
                        key={i}
                        setFavouriteStatus={props.setFavouriteStatus}
                        data={movie}
                        isFavourite={props.isFavourite}
                        handleClick={props.handleClick}
                        toggleBtnClass={props.toggleBtnClass}
                        src={`${currentBaseUrl}${currentLink}`}
                        alt={movie.image.alternativeText}
                        text={movie.nameRU}
                        duration={transformDuration(movie.duration)}
                        class={checkCards(i)}
                    />
                )
            })
            }
        </>
    )
}