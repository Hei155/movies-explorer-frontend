export function AboutProject() {
    return (
        <section className="aboutproject" id="aboutproject">
            <p className="aboutproject__title">О проекте</p>
            <div className="aboutproject__grid">
                <div className="aboutproject__grid-info">
                    <p className="aboutproject__grid-title">Дипломный проект включал 5 этапов</p>
                    <p className="aboutproject__grid-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="aboutproject__grid-info">
                    <p className="aboutproject__grid-title">На выполнение диплома ушло 5 недель</p>
                    <p className="aboutproject__grid-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="aboutproject__info-bar">
                <div className="aboutproject__line aboutproject__line_green">
                    <p className="aboutprject__info-text aboutprject__info-text_green">1 неделя</p>
                </div>
                <div className="aboutproject__line aboutproject__line_grey">
                    <p className="aboutprject__info-text aboutprject__info-text_grey">4 недели</p>
                </div>
                <p className="aboutprject__info-subtext">Back-end</p>
                <p className="aboutprject__info-subtext">Front-end</p>
            </div>
        </section>
    )
}