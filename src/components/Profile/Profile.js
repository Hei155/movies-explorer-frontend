import React from 'react';
import  { Header } from '../Header/Header';
import { SideBar } from '../SideBar/SideBar';
import UseForm from '../UseForm/UseForm';
import { CurrentUserContext } from '../../contexts/currentUserContext';

export function Profile(props) {
    const [isChange, setIsChange] = React.useState(false);
    const { values, handleClick, resetForm, handleChange, errors, isValid } = UseForm();
    const currentUser = React.useContext(CurrentUserContext);

    function checkClass() {
        if (isValid) {
            return true;
        }
        return '';
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.updateUserInfo(values.email, values.name);
        setIsChange(true);
    }

    function handleSignOut() {
        props.setIsLoginIn(false);
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('savedMovies');
        localStorage.removeItem("movieName");
    }

    return (
        <>
        <Header isLoginIn={props.isLoginIn} openSideBar={props.openSideBar}/>
        <main className="profile">
            <div className="profile__container">
                <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <label className="profile__field">
                        <span className="profile__text">Имя</span>
                        <input className="profile__input" name="name" type="name" onClick={handleClick} onChange={handleChange} minLength={3} value={values.name || currentUser.name || ''}/>                                          
                    </label>
                    <label className="profile__field">
                        <span className="profile__text">Email</span>
                        <input className="profile__input" name="email" type="email" onChange={handleChange} minLength={3} value={values.email || currentUser.email || ''}/>
                    </label>
                    <span className='profile__error'>{errors.name || errors.email}</span>
                    <button className={isValid ? "profile__submit" : "profile__submit profile__sibmit_inactive"} disabled={isValid || isChange ? '' : true} type="submit">Редактировать</button>
                </form>
                <button className="profile__signout" onClick={handleSignOut}>Выйти из аккаунта</button>
            </div>
        </main>
        <SideBar closeSideBar={props.closeSideBar} isOpen={props.isOpen}/>
        </>
    )
}