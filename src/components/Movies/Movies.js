import React from "react";
import { MoviesFrame } from "../MoviesFrame/MoviesFrame";

export function Movies(props) {
    return (  
        <MoviesFrame
                openSideBar={props.openSideBar}
                closeSideBar={props.closeSideBar} 
                isOpen={props.isOpen}
                data={props.movieList}
                toggleBtnClass="toggle__select"
        />
    )
}