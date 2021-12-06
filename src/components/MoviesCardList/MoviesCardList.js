import React from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard"

export function MoviesCardList(props) {
        return (
            <> 
                {props.data.map((movie, i) => {
                    
                    return (
                        <MoviesCard
                            src={movie.src}
                            alt={movie.alt}
                            text={movie.text}
                            duration={movie.duration}
                        />
                    )
                })
                }
            </>
        )
}