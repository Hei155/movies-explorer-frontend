import React from "react";
import  { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SearchForm } from "../SearchForm/SearchForm"
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { SideBar } from '../SideBar/SideBar';
import { Preloader } from "../Preloader/Preloader";

export function MoviesFrame(props) {
    return (
        props.isLoading ?
            <Preloader/>
        :
        <>
            <Header openSideBar={props.openSideBar}/>
            <main className="movie">
                <SearchForm/>
                <MovieGrid data={props.data} toggleBtnClass={props.toggleBtnClass} handleClick={props.handleClick} isFavourite={props.isFavourite}/>
            </main>
            <Footer/>
            <SideBar openSideBar={props.openSideBar} closeSideBar={props.closeSideBar} isOpen={props.isOpen}/>
        </>
    )
}