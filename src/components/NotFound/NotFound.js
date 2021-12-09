import React from "react";
import { useNavigate } from "react-router-dom";


export function NotFound(props) {
    let navigate = useNavigate();
    return (
        <section className="error">
            <h1 className="error__code">404</h1>
            <span className="error__describe">Страница не найдена</span>
            <span className="error__back" onClick={() => navigate(-1)}>Назад</span>
        </section>
    )
}