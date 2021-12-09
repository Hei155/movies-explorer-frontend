import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import React from "react";

export function MovieGrid(props) {
    const [isVisible, setVisible] = React.useState(true);
    React.useEffect(() => {
        if ((props.data.length < 16) || (props.isClicked)) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    },[props.data.length, props.isClicked])
    return (
        <>
            <div className="movies">
            <MoviesCardList toggleBtnClass={props.toggleBtnClass} isClicked={props.isClicked} data={props.data} ></MoviesCardList>
            </div>
            <button className={!isVisible ? "movies__btn movies__btn_hidden" : "movies__btn"} onClick={props.setClick}>Ещё</button>
        </>
    )
}