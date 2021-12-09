import pointer from '../../images/Pointer.svg'

export function Portfolio() {
    return (
        <section className="portfolio">
            <p className="portfolio__text">Портфолио</p>
            <ul className="portfolio__list">
                <li className="portfolio__paragraph">
                    <a className="portfolio__link" href="https://hei155.github.io/how-to-learn/">Статичный сайт</a>
                    <a className="portfolio__pointer-link" href="https://hei155.github.io/how-to-learn/"><img className="portfolio__pointer" src={pointer} alt="Указатель"></img></a>
                </li>
                <li className="portfolio__paragraph">
                    <a className="portfolio__link" href="https://hei155.github.io/russian-travel/">Адаптивный сайт</a>
                    <a className="portfolio__pointer-link" href="https://hei155.github.io/russian-travel/"><img className="portfolio__pointer" src={pointer} alt="Указатель"></img></a>
                </li>
                <li className="portfolio__paragraph">
                    <a className="portfolio__link" href="https://hei155.github.io/mesto/">Одностраничное приложение</a>
                    <a className="portfolio__pointer-link" href="https://hei155.github.io/mesto/"><img className="portfolio__pointer" src={pointer} alt="Указатель"></img></a>
                </li>
            </ul>
        </section>
    )
}