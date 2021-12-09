import React from 'react';
import  { Header } from '../Header/Header';
import { Promo } from '../Promo/Promo';
import { AboutProject  } from '../AboutProject/AboutProject';
import { Techs } from '../Techs/Techs';
import { AboutMe } from '../AboutMe/AboutMe';
import { Portfolio } from '../Portfolio/Portfolio';
import { Footer } from '../Footer/Footer';
import { SideBar } from '../SideBar/SideBar';

export function Main(props) {
    return (
        <>
            <Header openSideBar={props.openSideBar}/>
            <main className="content">
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main>
            <Footer />
            <SideBar closeSideBar={props.closeSideBar} isOpen={props.isOpen}/>
        </>
    )
}