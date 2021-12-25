import React from "react";
import  { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SearchForm } from "../SearchForm/SearchForm"
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { SideBar } from '../SideBar/SideBar';
import { Preloader } from "../Preloader/Preloader";
import { NotFound } from "../NotFound/NotFound";

export function MoviesFrame(props) {
    return (
        props.isLoading ?
        <Preloader/>
        :
        <>  
                <Header isLoginIn={props.isLoginIn} openSideBar={props.openSideBar}/>
                <main className="movie">
                    <SearchForm movieName={props.movieName} isShort={props.isShort} toggleShort={props.toggleShort} handleChange={props.handleChange} handleSubmit={props.handleSubmit}/>
                    {props.isEmpty ?
                    <NotFound text="Ничего не найдено."/>
                    :
                    <MovieGrid setIsEmpty={props.setIsEmpty} deleteFavouriteMovie={props.deleteFavouriteMovie} movieSavedList={props.movieSavedList} setFavouriteStatus={props.setFavouriteStatus} checkCurrentCards={props.checkCurrentCards} movies={props.movies} shortMovies={props.shortMovies} isShort={props.isShort} data={props.data} toggleBtnClass={props.toggleBtnClass} handleClick={props.handleClick} isFavourite={props.isFavourite}/>
                    }
                </main>
                <Footer/>
                <SideBar openSideBar={props.openSideBar} closeSideBar={props.closeSideBar} isOpen={props.isOpen}/>
        </>
    )
}