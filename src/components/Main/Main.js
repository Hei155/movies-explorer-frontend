import React from 'react';
import  { Header } from '../Header/Header';
import { Promo } from '../Promo/Promo';
import { AboutProject  } from '../AboutProject/AboutProject';
import { Techs } from '../Techs/Techs';
import { AboutMe } from '../AboutMe/AboutMe';
import { Portfolio } from '../Portfolio/Portfolio';
import { Footer } from '../Footer/Footer';
import { Movies } from '../Movies/Movies';
import { Register } from '../Register/Register.js';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { SideBar } from '../SideBar/SideBar';
import { Routes, Route } from 'react-router-dom'

export function Main(props) {
    const [isOpen , setOpen] = React.useState(false);

    function openSideBar() {
        setOpen(true);
    }

    return (
        <>
            <Routes>
                <Route path="signup" element={<Register />}/>
                <Route path="signin" element={<Login />}/>
                <Route path="profile" element={
                    <>
                        <SideBar isOpen={isOpen}/>
                        <Header openSideBar={openSideBar}/>
                        <Profile />
                    </>
                }/>
                <Route path="/movies" element={
                    <>
                        <SideBar isOpen={isOpen}/>
                        <Header openSideBar={openSideBar}/>
                        <Movies />
                        <Footer />
                    </>
                }/>
                <Route path="/" element={
                    <>
                        <Header />
                        <Promo />
                        <AboutProject />
                        <Techs />
                        <AboutMe />
                        <Portfolio />
                        <Footer />
                        <SideBar />
                    </>
                }/>
            </Routes>
        </>
    )
}