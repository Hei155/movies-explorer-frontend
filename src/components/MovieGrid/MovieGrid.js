import React from "react";
import { useMediaQuery } from 'react-responsive';
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";

export function MovieGrid(props) {
    const isBigger = useMediaQuery({ query: `(min-width: 1280px)` })
    const isBigWindow = useMediaQuery({ query: `(min-width: 910px) and (max-width: 1279px)` })
    const isSmallWindow = useMediaQuery({ query: `(min-width: 630px) and (max-width: 909px)` })
    const isMobile = useMediaQuery({ query: `(max-width: 629px)` })

    function checkMaxCard() {
        if (isBigWindow) {
            return 12;
        } else if (isSmallWindow) {
            return 8;
        } else if (isMobile) {
            return 5;
        } else if (isBigger) {
            return 16;
        }
    }
    
    const [maxCards, setMaxCards] = React.useState(checkMaxCard);

    React.useEffect(() => {
        if (isBigWindow) {
            setMaxCards(12);
        } else if (isSmallWindow) {
            setMaxCards(8);
        } else if (isMobile) {
            setMaxCards(5);
        } else if (isBigger) {
            setMaxCards(16)
        }
    },[isBigWindow, isSmallWindow, isMobile, isBigger])

    const [isVisible, setVisible] = React.useState(true);

    function checkBtnVisible(data) {
        if (data.length <= maxCards) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }

    React.useEffect(() => {
        if (props.isShort) {
            checkBtnVisible(props.shortMovies);
        } else {
            checkBtnVisible(props.movies)
        }
    },[props.movies, props.shortMovies, maxCards, props.isShort])

    function extendMovieList() {
        if (isBigger) {
            setMaxCards(maxCards + 4)
        } else if (isBigWindow) {
            setMaxCards(maxCards + 3)
        } else if (isSmallWindow || isMobile) {
            setMaxCards(maxCards + 2)
        }
        if (props.isShort) {
            checkBtnVisible(props.shortMovies);
        } else {
            checkBtnVisible(props.movies)
        }
    }

    return (
        <>
            <div className="movies">
            <MoviesCardList setIsEmpty={props.setIsEmpty} deleteFavouriteMovie={props.deleteFavouriteMovie} movieSavedList={props.movieSavedList}setFavouriteStatus={props.setFavouriteStatus} isShort={props.isShort} isFavourite={props.isFavourite} handleClick={props.handleClick} maxCards={maxCards} toggleBtnClass={props.toggleBtnClass} data={props.data} checkCurrentCards={props.checkCurrentCards}></MoviesCardList>
            </div>
            <button className={isVisible ? "movies__btn movies__btn_hidden" : "movies__btn"} onClick={extendMovieList}>Ещё</button>
        </>
    )
}