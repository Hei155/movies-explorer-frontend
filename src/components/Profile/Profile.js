import  { Header } from '../Header/Header';
import { SideBar } from '../SideBar/SideBar';

export function Profile(props) {
    return (
        <>
        <Header openSideBar={props.openSideBar}/>
        <main className="profile">
            <div className="profile__container">
                <h2 className="profile__title">Привет, Игорь!</h2>
                <form className="profile__form">
                    <label className="profile__field">
                        <span className="profile__text">Имя</span>
                        <input className="profile__input" name="name" type="text" required/>
                        <span className="profile__text">Игорь</span>                                                
                    </label>
                    <label className="profile__field">
                        <span className="profile__text">Email</span>
                        <input className="profile__input" name="email" type="email" required/>
                        <span className="profile__text">pochta@yandex.ru</span>
                    </label>
                    <button className="profile__submit" type="submit">Редактировать</button>
                </form>
                <button className="profile__signout">Выйти из аккаунта</button>
            </div>
        </main>
        <SideBar closeSideBar={props.closeSideBar} isOpen={props.isOpen}/>
        </>
    )
}