import React from "react";
import { MoviesFrame } from "../MoviesFrame/MoviesFrame";
import { shortMovieDuration } from "../../utils/const";

export function Movies(props) {
    const [isShort, setShort] = React.useState(localStorage.getItem('isMovieShort') || false);
    const [isEmpty, setIsEmpty] = React.useState(false);
    const [movieName, setMovieName] = React.useState(localStorage.getItem("movieName") || false);
    const [currentName, setCurrentName] = React.useState(localStorage.getItem("movieCurrentName"));
    const [movies, setMovies] = React.useState([]);
    const [shortMovies, setShortMovies] = React.useState([]);
    function handleChange(evt) {
        setMovieName(evt.target.value);
        localStorage.setItem("movieName", evt.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setCurrentName(movieName);
        localStorage.setItem("movieCurrentName", movieName);
        if (movieName) {
            if (isShort) {
                setShortMovies(props.movieList.filter((movie) => (movie.duration <= shortMovieDuration && movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))));
            } else {
                setMovies(props.movieList.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())));
            }
        } else {
            props.getMovies();
        }
    }

    function toggleShort() {
        if (isShort) {
            setShort(false);
            if (movieName) {
                setMovies(props.movieList.filter((movie) => movie.nameRU.toLowerCase().includes(currentName.toLowerCase())));
            }
            localStorage.removeItem('isMovieShort');
        } else {
            setShort(true);
            if (movieName) {
                setShortMovies(props.movieList.filter((movie) => (movie.duration <= shortMovieDuration && movie.nameRU.toLowerCase().includes(currentName.toLowerCase()))));
            }
            localStorage.setItem('isMovieShort', true);
        }
    }

    function checkCurrentCards() {
        if (isShort) {
            return shortMovies;
        }
        return movies;
    }

    React.useEffect(() => {
        setMovies(props.movieList);
        setShortMovies(props.movieList.filter((movie) => movie.duration <= shortMovieDuration));
        if (isShort) {
            if (currentName) {
                setShortMovies(props.movieList.filter((movie) => (movie.duration <= shortMovieDuration && movie.nameRU.toLowerCase().includes(currentName.toLowerCase()))));
            } else {
                setShortMovies(props.movieList.filter((movie) => movie.duration <= shortMovieDuration));
            }
        } else {
            if (currentName) {
                setMovies(props.movieList.filter((movie) => movie.nameRU.toLowerCase().includes(currentName.toLowerCase())));
            } else {
                setMovies(props.movieList);
            } 
        }
    }, [props.movieList])

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
                setFavouriteStatus={props.setFavouriteStatus}
                isFavourite={props.isFavourite}
                handleClick={props.handleClick}
                isLoading={props.isLoading}
                openSideBar={props.openSideBar}
                closeSideBar={props.closeSideBar} 
                isOpen={props.isOpen}
                toggleBtnClass="toggle__select"
        />
    )
}