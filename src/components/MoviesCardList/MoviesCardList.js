import React from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard"

export function MoviesCardList(props) {
    function changeClass() {
        return 'card'
    }
    return (
        <> 
            {props.data.map((movie, i) => {
                let classMovie;
                if (i > 15) {
                    classMovie = 'card_hidden';
                } else {                                                                        
                    classMovie = 'card';
                }
                return (
                    <MoviesCard
                        toggleBtnClass={props.toggleBtnClass}
                        src={movie.src}
                        alt={movie.alt}
                        text={movie.text}
                        duration={movie.duration}
                        class={props.isClicked ? changeClass(classMovie) : classMovie}
                    />
                )
            })
            }
        </>
    )
}