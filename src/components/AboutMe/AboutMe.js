import { Link } from 'react-router-dom';

import avatar from '../../images/MyAvatar.png';

export function AboutMe() {
    return (
        <section className="aboutme" id="aboutme">
            <p className="aboutme__contents">Студент</p>
            <div className="aboutme__info">
                <h3 className="aboutme__title">Игорь</h3>
                <p className="aboutme__subtitle">Фронтенд-разработчик, 19 лет</p>
                <p className="aboutme__text">
                    Я родился и живу в Новочеркасске - городе Ростовской области, обучаюсь на факультете информационных технологий 
                    и систем управления. С недавнего времени начал усиленно заниматься программированием, в частности - веб-разработкой.
                </p>
                <img src={avatar} className="aboutme__avatar" alt="Аватар"></img>
                <div className="aboutme__contacts">
                    <Link className="aboutme__link aboutme__link_facebook" to="#">Facebook</Link>
                    <Link className="aboutme__link aboutme__link_github" to="#">Github</Link>
                </div>
            </div>
        </section>
    )
}