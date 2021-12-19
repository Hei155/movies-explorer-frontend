import React from 'react';
import { AuthFrame } from '../AuthFrame/AuthFrame';
import UseForm from '../UseForm/UseForm';

export function Register(props) {
    const [btnClassName, setBtnClassName] = React.useState('auth__submit auth__submit_inactive');
    const [isBtnActive, setBtnActive] = React.useState(false);
    const validName = /^[A-Za-z0-9]+([A-Za-z0-9]*|[ _-]?[A-Za-z0-9]+)*$/mg;
    const { values, handleChange, errors, isValid, resetForm } = UseForm();

    function checkBtn() {
        if (isValid) {
            setBtnActive(true);
            setBtnClassName('auth__submit');
        } else {
            setBtnActive(false);
            setBtnClassName('auth__submit auth__submit_inactive');
        }
    }

    function onSubmit(evt) {
        evt.preventDefault();
        console.log(typeof(values.email))
        props.register(values.name, values.email, values.password);
    }

    React.useEffect(() => {
        checkBtn();
    }, [values])


    return (
        <AuthFrame
            onSubmit={onSubmit}
            errors={errors}
            handleChange={handleChange}
            isBtnActive={isBtnActive}
            btnClassName={btnClassName}
            title="Добро пожаловать!"
            text = "Зарегистрироваться"
            linkText="Уже зарегистрированы?"
            link="Войти"
            path="/signin"
        >
            <label className="register__field">
                <span className="register__text">Имя</span>
                <input className="register__input" name="name" type="text" minLength={3} maxLength={30} onChange={handleChange}/>
                <span className="register__error">{errors.name}</span>
            </label>
        </AuthFrame>
    )
}