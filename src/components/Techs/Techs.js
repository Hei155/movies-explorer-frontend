export function Techs() {
    return (
        <section className="techs" id="techs">
            <p className="techs__text">Технологии</p>
            <div className="techs__container">
                <h3 className="techs__title">7 технологий</h3>
                <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__about">
                    <li className="techs__about-list"><button className="techs__button">HTML</button></li>
                    <li className="techs__about-list"><button className="techs__button">CSS</button></li>
                    <li className="techs__about-list"><button className="techs__button">JS</button></li>
                    <li className="techs__about-list"><button className="techs__button">React</button></li>
                    <li className="techs__about-list"><button className="techs__button">Git</button></li>
                    <li className="techs__about-list"><button className="techs__button">Express.js</button></li>
                    <li className="techs__about-list"><button className="techs__button">mongoDB</button></li>
                </ul>
            </div>
        </section>
    )
}