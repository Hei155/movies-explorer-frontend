import React from "react";
import  { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SearchForm } from "../SearchForm/SearchForm"
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { SideBar } from '../SideBar/SideBar';
import { Preloader } from "../Preloader/Preloader";
import { NotFound } from "../NotFound/NotFound";
import { shortMovieDuration } from "../../utils/const";
import { useLocation } from "react-router-dom";

export function MoviesFrame(props) {
    const [isShort, setShort] = React.useState(localStorage.getItem('isMovieShort') || false);
    const [isEmpty, setIsEmpty] = React.useState(false);
    const [movieName, setMovieName] = React.useState(localStorage.getItem("movieName") || false);
    const [movies, setMovies] = React.useState([]);
    const [shortMovies, setShortMovies] = React.useState([]);
    const [isErrorVisible, setIsErrorVisible] = React.useState(false);
    const location = useLocation();

    function handleChange(evt) {
        setMovieName(evt.target.value);
        localStorage.setItem("movieName", evt.target.value);
        if (evt.target.value === '') {
            setIsErrorVisible(true);
            if (isShort) {
                setShortMovies(props.data.filter((movie) => movie.duration <= shortMovieDuration));
            } else {
                setMovies(props.data);
            }
        } else {
            setIsErrorVisible(false);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setShortMovies(shortMovies.filter((movie) => movie.duration <= shortMovieDuration));
        setMovies(movies)
        if (movieName) {
            if (isShort) {
                setShortMovies(shortMovies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())));
                localStorage.setItem('movies', JSON.stringify(shortMovies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))));
                localStorage.setItem('savedMovies', JSON.stringify(shortMovies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))));

            } else {
                setMovies(movies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())));
                localStorage.setItem('movies', JSON.stringify(movies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))));
                localStorage.setItem('savedMovies', JSON.stringify(movies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))));
            }
        } else {
            if (location.pathname === '/movies') {
                props.getMovies();
            } else if (location.pathname === '/saved-movies') {
                props.getSavedMovies();
            }
        }
    }

    function toggleShort() {
        if (isShort) {
            setShort(false);
            if (movieName) {
                setMovies(movies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())));
            }
            localStorage.removeItem('isMovieShort');
        } else {
            setShort(true);
            if (movieName) {
                setShortMovies(shortMovies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())));
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
            if (shortMovies) {
                setShortMovies(props.data.filter((movie) => movie.duration <= shortMovieDuration));
            } else {
                setMovies(props.data);
            }
    }, [movieName])

    React.useEffect(() => {
        setMovies(props.data);
        setShortMovies(props.data.filter((movie) => movie.duration <= shortMovieDuration))
        setIsErrorVisible(false)
    }, [props.data])

    React.useEffect(() => {
        if ((isShort && shortMovies.length === 0) || movies.length === 0) {
            setIsEmpty(true)
        } else {
            setIsEmpty(false)
        }
    }, [shortMovies, movies, isShort])

    return (
        props.isLoading ?
        <Preloader/>
        :
        <>  
                <Header isLoginIn={props.isLoginIn} openSideBar={props.openSideBar}/>
                <main className="movie">
                    <SearchForm isShort={isShort} isErrorVisible={isErrorVisible} toggleShort={toggleShort} handleChange={handleChange} handleSubmit={handleSubmit}/>
                    {isEmpty ?
                    <NotFound text="Ничего не найдено."/>
                    :
                    <MovieGrid setIsEmpty={setIsEmpty} deleteFavouriteMovie={props.deleteFavouriteMovie} movieSavedList={props.movieSavedList} setFavouriteStatus={props.setFavouriteStatus} checkCurrentCards={checkCurrentCards} movies={movies} shortMovies={shortMovies} isShort={isShort} data={props.data} toggleBtnClass={props.toggleBtnClass} handleClick={props.handleClick} isFavourite={props.isFavourite}/>
                    }
                </main>
                <Footer/>
                <SideBar openSideBar={props.openSideBar} closeSideBar={props.closeSideBar} isOpen={props.isOpen}/>
        </>
    )
}