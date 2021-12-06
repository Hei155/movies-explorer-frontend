import React from "react";
import { SearchForm } from "../SearchForm/SearchForm"
import { SavedMovies } from "../SavedMovies/SavedMovies";

export function Movies(props) {
    return (
        <section className="movies">
            <SearchForm></SearchForm>
            <SavedMovies></SavedMovies>
        </section>
    )
}