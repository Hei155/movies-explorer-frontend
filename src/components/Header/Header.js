import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/HeaderLogo.svg';
import profilePic from '../../images/ProfilePic.svg';

export function Header(props) {
    const [currentLink, setCurrentLink] = React.useState(window.location.pathname);
    const [logenIn, setLogenIn] = React.useState(true);

    function checkCurrentLink() {
        if (currentLink === '/') {
            setCurrentLink('/movies')
        } else if (currentLink === '/movies') {
            setCurrentLink('/');
        } else {
            setCurrentLink('/');
        }
    };

    React.useEffect(() => {
        checkCurrentLink()
    },[])
    return (
        <header className="header">
            <nav className="header__navigation">
            <Link className="header__link" to={currentLink} onClick={checkCurrentLink}><img src={logo} className="header__logo" alt="Лого" /></Link>
            <div className="header__profile">
                {!logenIn 
                ?
                <>
                    <Link className="header__registration" to="/signup">Регистрация</Link>
                    <button className="header__login">Войти</button> 
                </>
                :
                <>
                    <Link className="header__movies" to="/movies">Фильмы</Link>
                    <Link className="header__movies" to="/saved-movies">Сохранённые фильмы</Link>
                    <Link className="header__profile-link" to="/profile">Аккаунт</Link>
                    <Link className="header__profile-container" to="/profile"><img className="header__profile-pic" alt="Профиль" src={profilePic}/></Link>
                </>
                }
            </div>
            <button className="header__sidebar" onClick={props.openSideBar}/>
            </nav>
        </header>
    )
}                                                       