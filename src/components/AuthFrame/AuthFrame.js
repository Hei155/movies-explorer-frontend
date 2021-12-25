import logo from '../../images/HeaderLogo.svg';
import { Link } from 'react-router-dom';

export function AuthFrame(props) {

    return (
        <section className="auth">
            <Link className="auth__logo-link" to="/"><img className="auth__logo" src={logo} alt="Лого"/></Link>
            <h3 className="auth__title">{props.title}</h3>
            <form className="auth__form" onSubmit={props.onSubmit}>
                <div className="auth__container">
                    {props.children}
                    <label className="auth__field">
                        <span className="auth__text">E-mail</span>
                        <input className="auth__input" name="email" pattern="[A-Z0-9a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required minLength={3} maxLength={30} onChange={props.handleChange}/>
                        <span className="auth__error"></span>
                    </label>
                    <label className="auth__field">
                        <span className="auth__text">Пароль</span>
                        <input className="auth__input" type="password" name="password" required minLength={3} maxLength={30} onChange={props.handleChange}/>
                        <span className="auth__error">{props.errors.name || props.errors.email || props.errors.password || props.authError}</span>
                    </label>
                </div>
                <button disabled={props.isBtnActive && !props.isBlockReq ? '' : true} className={props.btnClassName} type="submit">{props.text}</button>
            </form>
            <p className="auth__link">{props.linkText} <Link className="register__login-link" to={props.path}>{props.link}</Link></p>
        </section>
    )
}