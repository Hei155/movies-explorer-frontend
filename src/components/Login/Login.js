import { AuthFrame } from '../AuthFrame/AuthFrame';

export function Login() {
    return (
        <AuthFrame 
            title="Рады видеть!"
            text = "Войти"
            linkText="Ещё не зарегистрированы?"
            link="Регистрация"
            path="/signup"
        />
    )
}