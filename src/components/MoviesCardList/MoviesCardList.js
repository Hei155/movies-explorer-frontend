import React from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard"
import { moviesApiBaseUrl } from "../../utils/const";

export function MoviesCardList(props) { 

    function transformDuration(durationInMinutes) {
        if (Number(durationInMinutes) < 60) {
            return `${durationInMinutes}м`;
        } else if (Number(durationInMinutes) === 60) {
            return `1ч`;
        }
        return `${Math.floor(durationInMinutes / 60)}ч${durationInMinutes % 60}м`
    }

    return (
        <> 
            {props.data.map((movie, i) => {
                let classMovie;
                if (i > props.maxCards - 1) {
                    classMovie = 'card_hidden';
                } else {                                                                        
                    classMovie = 'card';
                }
                return (
                    <MoviesCard
                        isFavourite={props.isFavourite}
                        handleClick={props.handleClick}
                        toggleBtnClass={props.toggleBtnClass}
                        src={`${moviesApiBaseUrl}${movie.image.url}`}
                        alt={movie.image.alternativeText}
                        text={movie.nameRU}
                        duration={transformDuration(movie.duration)}
                        class={classMovie}
                    />
                )
            })
            }
        </>
    )
}