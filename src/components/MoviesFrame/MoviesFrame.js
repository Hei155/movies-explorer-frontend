import React from "react";
import  { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SearchForm } from "../SearchForm/SearchForm"
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { SideBar } from '../SideBar/SideBar';

export function MoviesFrame(props) {
    const [isClicked, setClick] = React.useState(false);
    return (
        <>
            <Header openSideBar={props.openSideBar}/>
            <main className="movie">
                <SearchForm/>
                <MovieGrid isClicked={isClicked} setClick={setClick} data={props.data} toggleBtnClass={props.toggleBtnClass}/>
            </main>
            <Footer/>
            <SideBar openSideBar={props.openSideBar} closeSideBar={props.closeSideBar} isOpen={props.isOpen}/>
        </>
    )
}