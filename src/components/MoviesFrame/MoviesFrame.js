import React from "react";
import  { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SearchForm } from "../SearchForm/SearchForm"
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { SideBar } from '../SideBar/SideBar';
import { Preloader } from "../Preloader/Preloader";
import { NotFound } from "../NotFound/NotFound";

export function MoviesFrame(props) {
    const [isShort, setShort] = React.useState(false);
    const [movieName, setMovieName] = React.useState('');
    const [movies, setMovies] = React.useState([]);
    const [shortMovies, setShortMovies] = React.useState([]);
    const [isErrorVisible, setIsErrorVisible] = React.useState(false);

    function handleChange(evt) {
        setMovieName(evt.target.value)
        if (evt.target.value === '') {
            setIsErrorVisible(true);
            if (isShort) {
                setShortMovies(props.data.filter((movie) => movie.duration <= 40));
            } else {
                setMovies(props.data);
            }
        } else {
            setIsErrorVisible(false);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setShortMovies(props.data.filter((movie) => movie.duration <= 40));
        setMovies(props.data)
        if (isShort) {
            setShortMovies(props.data.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())))
        } else {
            setMovies(props.data.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())))
        }
    }

    function toggleShort() {
        if (isShort) {
            setShort(false);
        } else {
            setShort(true);
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
                setShortMovies(props.data.filter((movie) => movie.duration <= 40));
            } else {
                setMovies(props.data);
            }

    }, [movieName])

    React.useEffect(() => {
        setMovies(props.data);
        setShortMovies(props.data.filter((movie) => movie.duration <= 40))
        setIsErrorVisible(false)
    }, [props.data])

    return (
        props.isLoading ?
        <Preloader/>
        :
        <>  {movies.length === 0 || shortMovies.length === 0 ?
            <NotFound text="Ничего не найдено."/>
            :
            <>
                <Header openSideBar={props.openSideBar}/>
                <main className="movie">
                    <SearchForm isErrorVisible={isErrorVisible} toggleShort={toggleShort} handleChange={handleChange} handleSubmit={handleSubmit}/>
                    <MovieGrid setFavouriteStatus={props.setFavouriteStatus} checkCurrentCards={checkCurrentCards} movies={movies} shortMovies={shortMovies} isShort={isShort} data={props.data} toggleBtnClass={props.toggleBtnClass} handleClick={props.handleClick} isFavourite={props.isFavourite}/>
                </main>
                <Footer/>
                <SideBar openSideBar={props.openSideBar} closeSideBar={props.closeSideBar} isOpen={props.isOpen}/>
            </>
        }
        </>
    )
}