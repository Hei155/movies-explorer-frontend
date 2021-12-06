export function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__info">
                <p className="footer__date">&copy; {new Date().getFullYear()}</p>
                <nav className="footer__contacts">
                    <a className="footer__link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
                    <a className="footer__link" href="https://github.com/">Github</a>
                    <a className="footer__link" href="https://ru-ru.facebook.com/">Facebook</a>
                </nav>
            </div>
        </footer>
    )
}