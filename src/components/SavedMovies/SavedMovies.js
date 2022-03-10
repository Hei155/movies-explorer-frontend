import React from "react";
import { MoviesFrame } from "../MoviesFrame/MoviesFrame";
import { shortMovieDuration } from "../../utils/const";

export function SavedMovies(props) {
    const [isShort, setShort] = React.useState(localStorage.getItem('isSavedMovieShort') || false);
    const [isEmpty, setIsEmpty] = React.useState(false);
    const [movieName, setMovieName] = React.useState(localStorage.getItem("savedMovieName") || false);
    const [currentName, setCurrentName] = React.useState(localStorage.getItem("savedMovieCurrentName"));
    const [movies, setMovies] = React.useState([]);
    const [shortMovies, setShortMovies] = React.useState([]);
    
    function handleChange(evt) {
        setMovieName(evt.target.value);
        localStorage.setItem("savedMovieName", evt.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setCurrentName(movieName);
        localStorage.setItem('savedMovieCurrentName', movieName);
        if (movieName) {
            if (isShort) {
                setShortMovies(props.movieSavedList.filter((movie) => (movie.duration <= shortMovieDuration && movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))));
            } else {
                setMovies(props.movieSavedList.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())));
            }
        } else {
            props.getSavedMovies();
        }
    }

    function toggleShort() {
        if (isShort) {
            setShort(false);
            if (movieName) {
                setMovies(props.movieSavedList.filter((movie) => movie.nameRU.toLowerCase().includes(currentName.toLowerCase())));
            }
            localStorage.removeItem('isSavedMovieShort');
        } else {
            setShort(true);
            if (movieName) {
                setShortMovies(props.movieSavedList.filter((movie) => (movie.duration <= shortMovieDuration && movie.nameRU.toLowerCase().includes(currentName.toLowerCase()))));
            }
            localStorage.setItem('isSavedMovieShort', true);
        }
    }

    function checkCurrentCards() {
        if (isShort) {
            return shortMovies;
        }
        return movies;
    }

    React.useEffect(() => {
        setMovies(props.movieSavedList);
        setShortMovies(props.movieSavedList.filter((movie) => movie.duration <= shortMovieDuration));
        if (isShort) {
            if (movieName) {
                setShortMovies(props.movieSavedList.filter((movie) => (movie.duration <= shortMovieDuration && movie.nameRU.toLowerCase().includes(currentName.toLowerCase()))));
            } else {
                setShortMovies(props.movieSavedList.filter((movie) => movie.duration <= shortMovieDuration));
            }
        } else {
            if (movieName) {
                setMovies(props.movieSavedList.filter((movie) => movie.nameRU.toLowerCase().includes(currentName.toLowerCase())));
            } else {
                setMovies(props.movieSavedList);
            }
        }
    }, [props.movieSavedList])

    React.useEffect(() => {
        if ((isShort && shortMovies.length === 0) || movies.length === 0) {
            setIsEmpty(true)
        } else {
            setIsEmpty(false)
        }
    }, [shortMovies, movies, isShort])

    return (
        <MoviesFrame
            movieName={movieName}
            checkCurrentCards={checkCurrentCards} 
            movies={movies} 
            shortMovies={shortMovies} 
            isShort={isShort}
            isEmpty={isEmpty}
            setIsEmpty={setIsEmpty}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            toggleShort={toggleShort}
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