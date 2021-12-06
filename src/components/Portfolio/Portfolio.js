import { Link } from "react-router-dom"
import pointer from '../../images/Pointer.svg'

export function Portfolio() {
    return (
        <section className="portfolio">
            <p className="portfolio__text">Портфолио</p>
            <ul className="portfolio__list">
                <li className="portfolio__paragraph">
                    <Link className="portfolio__link" to="#">Статичный сайт</Link>
                    <Link className="portfolio__pointer-link" to="#"><img className="portfolio__pointer" src={pointer} alt="Указатель"></img></Link>
                </li>
                <li className="portfolio__paragraph">
                    <Link className="portfolio__link" to="#">Адаптивный сайт</Link>
                    <Link className="portfolio__pointer-link" to="#"><img className="portfolio__pointer" src={pointer} alt="Указатель"></img></Link>
                </li>
                <li className="portfolio__paragraph">
                    <Link className="portfolio__link" to="#">Одностраничное приложение</Link>
                    <Link className="portfolio__pointer-link" to="#"><img className="portfolio__pointer" src={pointer} alt="Указатель"></img></Link>
                </li>
            </ul>
        </section>
    )
}