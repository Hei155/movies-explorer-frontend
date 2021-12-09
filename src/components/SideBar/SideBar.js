import { Link } from 'react-router-dom';
import profilePic from '../../images/ProfilePic.svg';

export function SideBar(props) {
    return (
        <aside className={props.isOpen ? "sidebar sidebar_open" : "sidebar"}>
            <div className="sidebar__container">
                <button className="sidebar__close" onClick={props.closeSideBar}/>
                <nav className="sidebar__nav">
                    <ul className="sidebar__list">
                        <li className="sidebar__elem"><Link className="sidebar__link sidebar__return" to="/">Главная</Link></li>
                        <li className="sidebar__elem"><Link className="sidebar__link sidebar__movies" to="/movies">Фильмы</Link></li>
                        <li className="sidebar__elem"><Link className="sidebar__link sidebar__movies" to="/saved-movies">Сохранённые фильмы</Link></li>
                    </ul>
                    <div className="sidebar__profile-container">
                        <Link className="sidebar__profile-link" to="/profile">Аккаунт</Link>
                        <Link className="sidebar__pic" to="/profile"><img className="sidebar__profile-pic" alt="Профиль" src={profilePic}/></Link>
                    </div>
                </nav>
            </div>
        </aside>
    )
}