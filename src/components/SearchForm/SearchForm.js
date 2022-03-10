import React from "react";

export function SearchForm(props) {
    const [isChecked, setIsChecked] = React.useState(props.isShort);

    function handleToggle() {
        if (isChecked) {
            setIsChecked(false);
        } else {
            setIsChecked(true);
        }
    }

    return (
        <div className="searchcontainer">
            <form className="searchcontainer__form" onSubmit={props.handleSubmit}>
                <label className="searchcontainer__field">
                    <input className="searchcontainer__input" name="movie" placeholder="Фильм" type="text" onChange={props.handleChange} value={props.movieName || ''}></input>
                </label>
            <button className="searchcontainer__button" type="submit"></button>
            </form>
            <div className="searchcontainer__params">
                <input className="searchcontainer__toggle" type="checkbox" id="toggle" onClick={props.toggleShort} onChange={handleToggle} checked={isChecked ? "checked" : ""}/>
                <label className="searchcontainer__toggle-text searchcontainer__toggle-text_active" htmlFor="toggle">Короткометражки</label>
            </div>
        </div>
    )
}