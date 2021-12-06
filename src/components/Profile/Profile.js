export function Profile() {
    return (
        <section className="profile">
            <div className="profile__container">
                <h2 className="profile__title">Привет, Игорь!</h2>
                <form className="profile__form">
                    <label className="profile__field">
                        <span className="profile__text">Имя</span>
                        <input className="profile__input" name="name" type="text"/>
                        <span className="profile__text">Игорь</span>                                                
                    </label>
                    <label className="profile__field">
                        <span className="profile__text">Email</span>
                        <input className="profile__input" name="email" type="email"/>
                        <span className="profile__text">pochta@yandex.ru</span>
                    </label>
                    <button className="profile__submit" type="submit">Редактировать</button>
                </form>
                <button className="profile__signout">Выйти из аккаунта</button>
            </div>
        </section>
    )
}