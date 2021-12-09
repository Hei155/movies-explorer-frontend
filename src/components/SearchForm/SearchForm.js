export function SearchForm() {
    return (
        <div className="searchcontainer">
            <form className="searchcontainer__form">
                <label className="searchcontainer__field">
                    <input className="searchcontainer__input" placeholder="Фильм" type="text" required></input>
                </label>
            <button className="searchcontainer__button"></button>
            </form>
            <div className="searchcontainer__params">
                <input className="searchcontainer__toggle" type="checkbox" id="toggle"/>
                <label className="searchcontainer__toggle-text" htmlFor="toggle">Короткометражки</label>
            </div>
        </div>
    )
}