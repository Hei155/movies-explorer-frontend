import React from 'react';
import { useNavigate } from 'react-router-dom';
import  { Header } from '../Header/Header';
import { SideBar } from '../SideBar/SideBar';
import UseForm from '../UseForm/UseForm';
import { CurrentUserContext } from '../../contexts/currentUserContext';

export function Profile(props) {
    const { values, handleClick, handleChange, errors, isValid, resetForm } = UseForm();
    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(evt) {
        evt.preventDefault();   
    }

    function handleSignOut() {
        props.setIsLoginIn(false);
        localStorage.removeItem('jwt');
    }

    return (
        <>
        <Header isLoginIn={props.isLoginIn} openSideBar={props.openSideBar}/>
        <main className="profile">
            <div className="profile__container">
                <h2 className="profile__title">Привет, Игорь!</h2>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <label className="profile__field">
                        <span className="profile__text">Имя</span>
                        <input className="profile__input" name="name" type="text" onClick={handleClick} onChange={handleChange} minLength={3} value={currentUser.name || ''}/>                                          
                    </label>
                    <label className="profile__field">
                        <span className="profile__text">Email</span>
                        <input className="profile__input" name="email" type="email" onChange={handleChange} minLength={3} value={currentUser.email || ''}/>
                    </label>
                    <span className='profile__error'>{errors.name || errors.email}</span>
                    <button className="profile__submit" type="submit">Редактировать</button>
                </form>
                <button className="profile__signout" onClick={handleSignOut}>Выйти из аккаунта</button>
            </div>
        </main>
        <SideBar closeSideBar={props.closeSideBar} isOpen={props.isOpen}/>
        </>
    )
}