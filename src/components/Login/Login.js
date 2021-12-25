import React from 'react';
import { AuthFrame } from '../AuthFrame/AuthFrame';
import UseForm from '../UseForm/UseForm';

export function Login(props) {
    const [btnClassName, setBtnClassName] = React.useState('auth__submit auth__submit_inactive');
    const [isBtnActive, setBtnActive] = React.useState(false);
    const { values, handleChange, errors, isValid } = UseForm();

    function checkBtn() {
        if (isValid && !props.isBlockReq) {
            props.setAuthError('')
            setBtnActive(true);
            setBtnClassName('auth__submit');
        } else {
            setBtnActive(false);
            setBtnClassName('auth__submit auth__submit_inactive');
        }
    }

    function onSubmit(evt) {
        evt.preventDefault();
        props.login(values.email, values.password);
    }

    React.useEffect(() => {
        checkBtn();
    }, [values])

    return (
        <AuthFrame
            isBlockReq={props.isBlockReq}
            authError={props.authError}
            onSubmit={onSubmit}
            errors={errors}
            btnClassName={btnClassName}
            isBtnActive={isBtnActive}
            handleChange={handleChange}
            title="Рады видеть!"
            text = "Войти"
            linkText="Ещё не зарегистрированы?"
            link="Регистрация"
            path="/signup"
        />
    )
}