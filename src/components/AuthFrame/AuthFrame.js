import logo from '../../images/HeaderLogo.svg';
import { Link } from 'react-router-dom';

export function AuthFrame(props) {
    return (
        <section class="auth">
            <img className="auth__logo" src={logo} alt="Лого"/>
            <h3 className="auth__title">{props.title}</h3>
            <form className="auth__form">
                {props.children}
                <label className="auth__field">
                    <span className="auth__text">E-mail</span>
                    <input className="auth__input" name="email" type="email"/>
                </label>
                <label className="auth__field">
                    <span className="auth__text">Пароль</span>
                    <input className="auth__input" name="password" type="password"/>
                </label>
                <button className="auth__submit" type="submit">{props.text}</button>
            </form>
            <p className="auth__link">{props.linkText} <Link className="register__login-link" to={props.path}>{props.link}</Link></p>
        </section>
    )
}