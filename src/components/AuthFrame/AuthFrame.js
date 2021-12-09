import logo from '../../images/HeaderLogo.svg';
import { Link } from 'react-router-dom';

export function AuthFrame(props) {
    return (
        <section class="auth">
            <Link className="auth__logo-link" to="/"><img className="auth__logo" src={logo} alt="Лого"/></Link>
            <h3 className="auth__title">{props.title}</h3>
            <form className="auth__form">
                <div className="auth__container">
                    {props.children}
                    <label className="auth__field">
                        <span className="auth__text">E-mail</span>
                        <input className="auth__input" name="email" type="email" required/>
                        <span className="auth__error"></span>
                    </label>
                    <label className="auth__field">
                        <span className="auth__text">Пароль</span>
                        <input className="auth__input" name="password" type="password" required/>
                        <span className="auth__error">Что-то пошло не так...</span>
                    </label>
                </div>
                <button className="auth__submit" type="submit">{props.text}</button>
            </form>
            <p className="auth__link">{props.linkText} <Link className="register__login-link" to={props.path}>{props.link}</Link></p>
        </section>
    )
}