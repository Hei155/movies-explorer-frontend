import React from "react";
import { MoviesFrame } from "../MoviesFrame/MoviesFrame";

export function SavedMovies(props) {
    return (
        <MoviesFrame
            openSideBar={props.openSideBar}
            closeSideBar={props.closeSideBar} 
            isOpen={props.isOpen}
            data={props.movieSavedList}
            toggleBtnClass="toggle__select-delete"
        />
    )
}