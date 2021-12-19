import React from 'react';
import { useForm } from 'react-hook-form';
import  { Header } from '../Header/Header';
import { SideBar } from '../SideBar/SideBar';
import UseForm from '../UseForm/UseForm';

export function Profile(props) {
    const { values, handleChange, errors, isValid, resetForm } = UseForm();
    function handleSubmit(evt) {
        evt.preventDefault();
    }
    return (
        <>
        <Header openSideBar={props.openSideBar}/>
        <main className="profile">
            <div className="profile__container">
                <h2 className="profile__title">Привет, Игорь!</h2>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <label className="profile__field">
                        <span className="profile__text">Имя</span>
                        <input className="profile__input" name="name" type="text" onChange={handleChange} minLength={3}/>                                          
                    </label>
                    <label className="profile__field">
                        <span className="profile__text">Email</span>
                        <input className="profile__input" name="email" type="email" onChange={handleChange} minLength={3}/>
                    </label>
                    <span className='profile__error'>{errors.name || errors.email}</span>
                    <button className="profile__submit" type="submit">Редактировать</button>
                </form>
                <button className="profile__signout">Выйти из аккаунта</button>
            </div>
        </main>
        <SideBar closeSideBar={props.closeSideBar} isOpen={props.isOpen}/>
        </>
    )
}