import React from "react";
import { useMediaQuery } from 'react-responsive';
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { movieNumber, extendMovieNumber } from "../../utils/const";

export function MovieGrid(props) {
    const isBigger = useMediaQuery({ query: `(min-width: 1280px)` });
    const isBigWindow = useMediaQuery({ query: `(min-width: 910px) and (max-width: 1279px)` });
    const isSmallWindow = useMediaQuery({ query: `(min-width: 630px) and (max-width: 909px)` });
    const isMobile = useMediaQuery({ query: `(max-width: 629px)` });
    const [isJustLeftContent, setIsJustLeftContent] = React.useState(false);

    function checkMaxCard() {
        if (isBigWindow) {
            return movieNumber.forBigWindow;
        } else if (isSmallWindow) {
            return movieNumber.forSmallWindow;
        } else if (isMobile) {
            return movieNumber.forMobile;
        } else if (isBigger) {
            return movieNumber.forBiggerWindow;
        }
    }
    
    const [maxCards, setMaxCards] = React.useState(checkMaxCard);

    React.useEffect(() => {
        if (isBigWindow) {
            setMaxCards(movieNumber.forBigWindow);
        } else if (isSmallWindow) {
            setMaxCards(movieNumber.forSmallWindow);
        } else if (isMobile) {
            setMaxCards(movieNumber.forMobile);
        } else if (isBigger) {
            setMaxCards(movieNumber.forBiggerWindow)
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
            if (props.shortMovies.length < 4) {
                setIsJustLeftContent(true);
            } else {
                setIsJustLeftContent(false);
            }
        } else {
            checkBtnVisible(props.movies)
            if (props.movies.length < 4) {
                setIsJustLeftContent(true);
            } else {
                setIsJustLeftContent(false);
            }
        }
    },[props.movies, props.shortMovies, maxCards, props.isShort])

    function extendMovieList() {
        if (isBigger) {
            setMaxCards(maxCards + extendMovieNumber.forBiggerWindow)
        } else if (isBigWindow) {
            setMaxCards(maxCards + extendMovieNumber.forBigWindow)
        } else if (isSmallWindow || isMobile) {
            setMaxCards(maxCards + extendMovieNumber.forSmallAndMobile)
        }
        if (props.isShort) {
            checkBtnVisible(props.shortMovies);
        } else {
            checkBtnVisible(props.movies)
        }
    }

    return (
        <>
            <div className={isJustLeftContent && isBigger ? 'movies movies_start' : 'movies'}>
            <MoviesCardList setIsEmpty={props.setIsEmpty} deleteFavouriteMovie={props.deleteFavouriteMovie} movieSavedList={props.movieSavedList}setFavouriteStatus={props.setFavouriteStatus} isShort={props.isShort} isFavourite={props.isFavourite} handleClick={props.handleClick} maxCards={maxCards} toggleBtnClass={props.toggleBtnClass} data={props.data} checkCurrentCards={props.checkCurrentCards}></MoviesCardList>
            </div>
            <button className={isVisible ? "movies__btn movies__btn_hidden" : "movies__btn"} onClick={extendMovieList}>Ещё</button>
        </>
    )
}