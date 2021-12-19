import './App.css';
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { Register } from '../Register/Register.js';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { NotFound } from '../NotFound/NotFound';
import movieApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import auth from '../../utils/Auth';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/currentUserContext';

function App() {
  const [isOpen , setOpen] = React.useState(false);
  const [movieList, setMovieList] = React.useState([]);
  const [movieSavedList, setMovieSavedList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFavourite, setFavourite] = React.useState(false);
  const [isLoginIn, setIsLoginIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const location = useLocation();

  function getMovies() {
    setIsLoading(true)
    movieApi.getAllMovies()
      .then((res) => {
        setMovieList(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  function setFavouriteStatus(data) {
    mainApi.setFavouriteMovie(data)
    .catch((err) => console.log(err))
  }

  function register(name, email, password) {
    auth.register(name, email, password)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  function login(email, password) {
    auth.authorize(email, password)
      .then(() => {
        setIsLoginIn(true);
      })
      .catch((err) => console.log(err))
  }

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then(() => {
          setIsLoginIn(true);
        })
        .catch((err) => console.log(err))
    }
  }
  
  React.useEffect(() => {
    if (location.pathname === '/movies') {
      getMovies();
    }
    const savedCards = [];
    const savedCard = {
      src: 'https://approvecode.com/wp-content/uploads/2020/04/Preloader-na-html-i-css.png',
      alt: "фото",
      text: "Тест",
      duration: "1ч2м"
    }
    for (let i = 0; i < 4; i++) {
      savedCards.push(savedCard);
    }
    setMovieSavedList(savedCards)
    },[location.pathname])

  function openSideBar() {
    setOpen(true);
  }
    
  function closeSideBar() {
    setOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="*" element={<NotFound code="404" text='Ничего не найдено'/>}/>
          <Route path="/" element={<Main openSideBar={openSideBar} closeSideBar={closeSideBar} isOpen={isOpen}/>}/>
          <Route path="/signup" element={<Register register={register}/>}/>
          <Route path="/signin" element={<Login login={login}/>}/>
          <Route
            isLoginIn={isLoginIn}
            path="/profile" 
            component={Profile}
            openSideBar={openSideBar}
            closeSideBar={closeSideBar}
            isOpen={isOpen}
          />
          <Route
            isLoginIn={isLoginIn}
            path="/movies" 
            element={ProtectedRoute}
          >
            <Route
              setFavouriteStatus={setFavouriteStatus} 
              isFavourite={isFavourite} 
              isLoading={isLoading} 
              movieList={movieList} 
              openSideBar={openSideBar} 
              closeSideBar={closeSideBar} 
              isOpen={isOpen}
            />
          </Route> 
          <Route
            isLoginIn={isLoginIn}
            path="/saved-movies"
            movieSavedList={movieSavedList} 
            openSideBar={openSideBar} 
            closeSideBar={closeSideBar} 
            isOpen={isOpen}
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
