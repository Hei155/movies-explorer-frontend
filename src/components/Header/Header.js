import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/HeaderLogo.svg';
import profilePic from '../../images/ProfilePic.svg';
import { useMediaQuery } from 'react-responsive';


export function Header(props) {
    const isBigWindow = useMediaQuery({ query: `(max-width: 909px)` })
    const [isVisible, setIsVisivle] = React.useState(true);
    React.useEffect(() => {
        if (isBigWindow && props.isLoginIn) {
            setIsVisivle(false);
        }
    }, [isBigWindow])
    return (
        <header className="header">
            <nav className="header__navigation">
            <Link className="header__link" to="/"><img src={logo} className="header__logo" alt="Лого" /></Link>
            
            <div className={isVisible ? 'header__profile' : 'header__profile header__profile_hidden'}>
                {!props.isLoginIn
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
            <button className={props.isLoginIn ? 'header__sidebar' : 'header__sidebar_hidden'} onClick={props.openSideBar}/>
            </nav>
        </header>
    )
}                                                       