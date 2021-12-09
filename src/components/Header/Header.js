import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/HeaderLogo.svg';
import profilePic from '../../images/ProfilePic.svg';

export function Header(props) {
    const [logenIn, setLogenIn] = React.useState(false);

    return (
        <header className="header">
            <nav className="header__navigation">
            <Link className="header__link" to="/"><img src={logo} className="header__logo" alt="Лого" /></Link>
            <div className="header__profile">
                {!logenIn 
                ?
                <>
                    <Link className="header__registration" to="/signup">Регистрация</Link>
                    <Link className="header__login-link" to="/signin"><button className="header__login">Войти</button></Link>
                </>
                :
                <>
                    <Link className="header__movies" to="/movies" onClick={props.closeSideBar}>Фильмы</Link>
                    <Link className="header__movies" to="/saved-movies" onClick={props.closeSideBar}>Сохранённые фильмы</Link>
                    <Link className="header__profile-link" to="/profile" onClick={props.closeSideBar}>Аккаунт</Link>
                    <Link className="header__profile-container" to="/profile" onClick={props.closeSideBar}><img className="header__profile-pic" alt="Профиль" src={profilePic}/></Link>
                </>
                }
            </div>
            <button className="header__sidebar" onClick={props.openSideBar}/>
            </nav>
        </header>
    )
}                                                       