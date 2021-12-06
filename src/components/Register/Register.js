import { AuthFrame } from '../AuthFrame/AuthFrame';

export function Register() {
    return (
        <AuthFrame
            title="Добро пожаловать!"
            text = "Зарегистрироваться"
            linkText="Уже зарегистрированы?"
            link="Войти"
            path="/signin"
        >
            <label className="register__field">
            <span className="register__text">Имя</span>
            <input className="register__input" name="name" type="text"/>
            </label>
        </AuthFrame>
    )
}