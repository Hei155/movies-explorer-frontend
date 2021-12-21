import React from "react";
import { MoviesFrame } from "../MoviesFrame/MoviesFrame";

export function SavedMovies(props) {
    return (
        <MoviesFrame
            deleteFavouriteMovie={props.deleteFavouriteMovie}
            movieSavedList={props.movieSavedList}
            isLoginIn={props.isLoginIn}
            isLoading={props.isLoading}
            openSideBar={props.openSideBar}
            closeSideBar={props.closeSideBar} 
            isOpen={props.isOpen}
            data={props.movieSavedList}
            toggleBtnClass="toggle__select-delete"
        />
    )
}