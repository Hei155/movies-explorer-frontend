import React from "react";
import { MoviesFrame } from "../MoviesFrame/MoviesFrame";

export function Movies(props) {
    return (  
        <MoviesFrame
                getMovies={props.getMovies}
                deleteFavouriteMovie={props.deleteFavouriteMovie}
                movieSavedList={props.movieSavedList}
                isLoginIn={props.isLoginIn}
                setFavouriteStatus={props.setFavouriteStatus}
                isFavourite={props.isFavourite}
                handleClick={props.handleClick}
                isLoading={props.isLoading}
                openSideBar={props.openSideBar}
                closeSideBar={props.closeSideBar} 
                isOpen={props.isOpen}
                data={props.movieList}
                toggleBtnClass="toggle__select"
        />
    )
}