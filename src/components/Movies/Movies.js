import React from "react";
import { MoviesFrame } from "../MoviesFrame/MoviesFrame";

export function Movies(props) {
    return (  
        <MoviesFrame
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