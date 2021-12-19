import React from "react";

export function SearchForm(props) {
    return (
        <div className="searchcontainer">
            <form className="searchcontainer__form" onSubmit={props.handleSubmit}>
                <label className="searchcontainer__field">
                    <input className="searchcontainer__input" name="movie" placeholder="Фильм" type="text" required onChange={props.handleChange}></input>
                    <span className={props.isErrorVisible ? "searchcontainer__error" : "searchcontainer__error searchcontainer__error_hidden"}>Нужно ввести ключевое слово</span>
                </label>
            <button className="searchcontainer__button" type="submit"></button>
            </form>
            <div className="searchcontainer__params">
                <input className="searchcontainer__toggle" type="checkbox" id="toggle"/>
                <label className="searchcontainer__toggle-text" htmlFor="toggle" onClick={props.toggleShort}>Короткометражки</label>
            </div>
        </div>
    )
}