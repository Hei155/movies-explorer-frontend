import React from 'react';
import  { Header } from '../Header/Header';
import { SideBar } from '../SideBar/SideBar';
import UseForm from '../UseForm/UseForm';
import { CurrentUserContext } from '../../contexts/currentUserContext';

export function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [isDifferent, setIsDifferent] = React.useState(false);
    const { nameProfile, emailProfile, values, resetForm, handleChange, handleProfileChange, nameError, emailError, errors, isValid } = UseForm();

    function handleSubmit(evt) {
        evt.preventDefault();
        props.updateUserInfo(emailProfile, nameProfile);
        console.log(currentUser.email);
    }

    function handleSignOut() {
        props.setIsLoginIn(false);
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('savedMovies');
        localStorage.removeItem("movieName");
        localStorage.removeItem('isMovieShort')
        localStorage.removeItem("savedMovieName");
        localStorage.removeItem('isSavedMovieShort');
    }

    function checkCurrentData(data) {
        if (nameProfile === data.name && emailProfile === data.email) {
            return false;
        } else {
            return true;
        }
    }
    
    React.useEffect(() => {
        props.setAuthError('')
        props.setIsBlockOnError(false);
    }, [nameProfile, emailProfile])

    return (
        <>
        <Header isLoginIn={props.isLoginIn} openSideBar={props.openSideBar}/>
        <main className="profile">
            <div className="profile__container">
                <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <label className="profile__field">
                        <span className="profile__text">Имя</span>
                        <input className="profile__input" disabled={!props.isBlockReq ? '' : true} name="name" type="name" onChange={handleProfileChange} required minLength={3} value={nameProfile || ''}/>                                          
                    </label>
                    <label className="profile__field">
                        <span className="profile__text">Email</span>
                        <input className="profile__input" disabled={!props.isBlockReq ? '' : true} name="email" type="email" onChange={handleProfileChange} required pattern="[A-Z0-9a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" minLength={3} value={emailProfile || ''}/>
                    </label>
                    <span className='profile__error'>{nameError || emailError || props.authError}</span>
                    <button className={isValid ? "profile__submit" : "profile__submit profile__sibmit_inactive"} disabled={isValid && !props.isBlockReq && checkCurrentData(currentUser) && !props.isBlockOnError ? '' : true} type="submit">Редактировать</button>
                </form>
                <button className="profile__signout" onClick={handleSignOut}>Выйти из аккаунта</button>
            </div>
        </main>
        <SideBar closeSideBar={props.closeSideBar} isOpen={props.isOpen}/>
        </>
    )
}