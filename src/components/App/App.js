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
import { NotificationPopup } from '../NotificationPopup/NotificationPopup';
import movieApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import auth from '../../utils/Auth';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/currentUserContext';
import { useNavigate } from 'react-router-dom';
import { movieMap } from '../../utils/movieHelper';

function App() {
  const [activeClass, setIsActiveClass] = React.useState(false)
  const [isOpen , setOpen] = React.useState(false);
  const [movieList, setMovieList] = React.useState([]);
  const [movieSavedList, setMovieSavedList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [authError, setAuthError] = React.useState('');
  const [isBlockReq, setIsBlockReq] = React.useState(false);
  const [isClose, setIsClose] = React.useState(true);
  const [popupText, setPopupText] = React.useState('');
  const [isBlockOnError, setIsBlockOnError] = React.useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  function checkIsLogin() {
    if (localStorage.getItem('jwt')) {
      return true;
    }
    return false;
  }
  const [isLoginIn, setIsLoginIn] = React.useState(checkIsLogin());

  function getMovies() {
    setIsLoading(true);
    movieApi.getAllMovies()
      .then((res) => {
        const movieDefault = movieMap(res);
        setMovieList(movieDefault);
        localStorage.setItem('movies', JSON.stringify(movieDefault));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function getSavedMovies(user=currentUser._id) {
    setIsLoading(true);
    mainApi.getFavouritesMovie(localStorage.getItem('jwt'))
      .then((res) => {
        setMovieSavedList(res.filter((movie) => movie.owner === user));
        localStorage.setItem('savedMovies', JSON.stringify(res.filter((movie) => movie.owner === user)));
        setIsLoading(false);
      })
      .catch(err => console.log(err))
  }
  
  function setFavouriteStatus(data) {
    mainApi.setFavouriteMovie(data, localStorage.getItem('jwt'))
    .then(() => {
      mainApi.getFavouritesMovie(localStorage.getItem('jwt'))
        .then((res) => {
          setIsActiveClass(true);
          setMovieSavedList(res.filter((movie) => movie.owner === currentUser._id));
          localStorage.setItem('savedMovies', JSON.stringify(res.filter((movie) => movie.owner === currentUser._id)));
        })
        .catch(err => console.log(err))
      localStorage.setItem('savedMovies', JSON.stringify([...movieSavedList, data]));
      return true
    })
    .catch((err) => console.log(err))
  }

  function deleteFavouriteMovie(card, id) {
    mainApi.deleteFavouriteMovie(id, localStorage.getItem('jwt'))
      .then(() => {
        setIsActiveClass(false);
        setMovieSavedList([...movieSavedList].filter(movie => !(movie.movieId === card.movieId)))
        localStorage.setItem('savedMovies', JSON.stringify([...movieSavedList].filter(movie => !(movie.movieId === card.movieId))));
      })
      .catch(err => console.log(err))
  }

  function login(email, password, popupStatus='авторизовались!') {
    setIsBlockReq(true);
    auth.authorize(email, password)
      .then(() => {
        setIsLoginIn(true);
        setIsClose(false);
        setIsBlockReq(false);
        setAuthError('');
        getCurrentUser();
        navigate('/movies');
        setPopupText(popupStatus);
        checkToken();
      })
      .catch((err) => {
        setIsBlockOnError(true);
        setIsBlockReq(false);
        console.log(err)
        setAuthError('Что-то пошло не так...');
      })
  }

  function register(name, email, password,  popupStatus='зарегистрировались!') {
    setIsBlockReq(true);
    auth.register(name, email, password)
      .then(() => {
        setIsBlockReq(false);
        login(email, password, popupStatus);
      })
      .catch((err) => {
        setIsBlockOnError(true);
        setIsBlockReq(false);
        console.log(err);
        setAuthError('Что-то пошло не так...');
      })
  }

  function updateUserInfo(email, name) {
    setIsBlockReq(true);
    auth.updateUser(email, name)
    .then(() => {
      mainApi.getUserData(localStorage.getItem('jwt'))
        .then(res => setCurrentUser(res))
      setPopupText('обновили свои данные');
      setIsClose(false);
      setIsBlockReq(false);
    })
    .catch((err) => {
      setIsBlockOnError(true);
      setIsBlockReq(false);
      console.log(err);
      setAuthError('Что-то пошло не так...');
  })
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

  function getCurrentUser() {
    mainApi.getUserData(localStorage.getItem('jwt'))
      .then((res) => {
        setCurrentUser(res);
        if (location.pathname === '/movies' || location.pathname === '/saved-movies') {
          if (localStorage.getItem('movies')) {
            setMovieList(JSON.parse(localStorage.getItem('movies')));
          } else {
            getMovies();
          }
          if (localStorage.getItem('savedMovies')) {
            setMovieSavedList(JSON.parse(localStorage.getItem('savedMovies')));
          } else {
            getSavedMovies(res._id);
          }
        }
      })
      .catch(err => console.log(err))
  }

  function openSideBar() {
    setOpen(true);
  }
    
  function closeSideBar() {
    setOpen(false)
  }

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
        getCurrentUser();
        checkToken();
    }
  },[])

  React.useEffect(() => {
    getCurrentUser();
    document.title = "Movies Project";
  }, [location.pathname, isLoginIn])

  React.useEffect(() => {
    checkToken();
  }, [location.pathname, isLoginIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <NotificationPopup popupText={popupText} setIsClose={setIsClose} isClose={isClose}></NotificationPopup>
        <Routes>
          <Route path="*" element={<NotFound linkText="Назад" code="404" text='Ничего не найдено'/>}/>
          <Route path="/" element={<Main isLoginIn={isLoginIn} openSideBar={openSideBar} closeSideBar={closeSideBar} isOpen={isOpen}/>}/>
          <Route 
            path="/signup" 
            element={
              <ProtectedRoute
                isLoginIn={!isLoginIn}
                children={
                  !isLoginIn && <Register
                    isBlockOnError={isBlockOnError}
                    setIsBlockOnError={setIsBlockOnError}
                    setAuthError={setAuthError}
                    authError={authError}
                    register={register}
                    isBlockReq={isBlockReq}
                  />
                }
              />
            }
          />
          <Route 
            path="/signin" 
            element={
              <ProtectedRoute
                isLoginIn={!isLoginIn}
                children={
                  !isLoginIn && <Login
                    isBlockOnError={isBlockOnError}
                    setIsBlockOnError={setIsBlockOnError}
                    setAuthError={setAuthError}
                    authError={authError}
                    login={login}
                    setIsBlockReq={setIsBlockReq}
                    isBlockReq={isBlockReq}
                  />
                }
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoginIn={isLoginIn}
                children={
                  isLoginIn && <Profile
                    isBlockOnError={isBlockOnError}
                    setIsBlockOnError={setIsBlockOnError}
                    setAuthError={setAuthError}
                    authError={authError}
                    isBlockReq={isBlockReq}
                    updateUserInfo={updateUserInfo}
                    isLoginIn={isLoginIn}
                    openSideBar={openSideBar}
                    closeSideBar={closeSideBar}
                    isOpen={isOpen}
                    setIsLoginIn={setIsLoginIn}
                  />
                }
              />
            }
          />
          <Route
            path="/movies" 
            element={
              <ProtectedRoute
                isLoginIn={isLoginIn}
                children={
                  isLoginIn && <Movies
                    getMovies={getMovies}
                    deleteFavouriteMovie={deleteFavouriteMovie}
                    setFavouriteStatus={setFavouriteStatus} 
                    movieList={movieList}
                    movieSavedList={movieSavedList}
                    openSideBar={openSideBar} 
                    closeSideBar={closeSideBar} 
                    isLoading={isLoading} 
                    isOpen={isOpen}
                    isLoginIn={isLoginIn}
                  />
                }
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                isLoginIn={isLoginIn}
                children={
                  isLoginIn && <SavedMovies
                    getSavedMovies={getSavedMovies}
                    deleteFavouriteMovie={deleteFavouriteMovie}
                    movieSavedList={movieSavedList} 
                    openSideBar={openSideBar} 
                    closeSideBar={closeSideBar} 
                    isLoading={isLoading}
                    isOpen={isOpen}
                    isLoginIn={isLoginIn}
                  />
                }
              />
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
