import React from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard"

export function MoviesCardList(props) { 
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

    return (
        <> 
            {props.checkCurrentCards().map((movie, i) => {
                return (
                    <MoviesCard
                        deleteFavouriteMovie={props.deleteFavouriteMovie}
                        isActive={props.movieSavedList.some(i => i.movieId === movie.movieId)}
                        movieSavedList={props.movieSavedList}
                        key={i}
                        setFavouriteStatus={props.setFavouriteStatus}
                        data={movie}
                        isFavourite={props.isFavourite}
                        handleClick={props.handleClick}
                        toggleBtnClass={props.toggleBtnClass}
                        src={movie.image}
                        alt={movie.image.alternativeText}
                        text={movie.nameRU}
                        duration={transformDuration(movie.duration)}
                        class={checkCards(i)}
                        youTubeLink={movie.trailer}
                    />
                )
            })
            }
        </>
    )
}