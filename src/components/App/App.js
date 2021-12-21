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
import { useNavigate } from 'react-router-dom';
import { movieMap } from '../../utils/movieHelper';

function App() {
  const [isOpen , setOpen] = React.useState(false);
  const [movieList, setMovieList] = React.useState([]);
  const [movieSavedList, setMovieSavedList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
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

  function getSavedMovies() {
    setIsLoading(true);
    mainApi.getFavouritesMovie()
      .then((res) => {
        setMovieSavedList(res);
        localStorage.setItem('savedMovies', JSON.stringify(res));
        setIsLoading(false);
      })
      .catch(err => console.log(err))
  }
  
  function setFavouriteStatus(data) {
    mainApi.setFavouriteMovie(data)
    .then(() => {
      localStorage.setItem('savedMovies', JSON.stringify([...movieSavedList, data]));
    })
    .catch((err) => console.log(err))
  }

  function deleteFavouriteMovie(card, id) {
    mainApi.deleteFavouriteMovie(id)
      .then(() => {
        setMovieSavedList([...movieSavedList].filter(movie => !(movie.movieId === card.movieId)))
      })
      .catch(err => console.log(err))
  }

  function register(name, email, password) {
    auth.register(name, email, password)
      .then(() => {
        navigate('/signin');
      })
      .catch((err) => console.log(err))
  }

  function login(email, password) {
    auth.authorize(email, password)
      .then(() => {
        setIsLoginIn(true);
        navigate('/');
      })
      .catch((err) => console.log(err))
  }

  function updateUserInfo(email, name) {
    auth.updateUser(email, name)
    .catch(err => console.log(err))
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
    mainApi.getUserData()
      .then((res) => {
        setCurrentUser(res);
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
    if (location.pathname === '/movies' || location.pathname === '/saved-movies') {
      if (localStorage.getItem('movies') && JSON.parse(localStorage.getItem('movies')).length === movieList.length) {
        setMovieList(JSON.parse(localStorage.getItem('movies')));
      } else {
        getMovies();
      }
      if (localStorage.getItem('savedMovies') && JSON.parse(localStorage.getItem('savedMovies')).length === movieSavedList.length) {
        setMovieSavedList(JSON.parse(localStorage.getItem('savedMovies')));
      } else {
        getSavedMovies();
      }
    }
    },[location.pathname])

  React.useEffect(() => {
    if (location.pathname === '/profile') {
      getCurrentUser();
    }
  }, [location.pathname])

  React.useEffect(() => {
    checkToken();
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="*" element={<NotFound linkText="Назад" code="404" text='Ничего не найдено'/>}/>
          <Route path="/" element={<Main isLoginIn={isLoginIn} openSideBar={openSideBar} closeSideBar={closeSideBar} isOpen={isOpen}/>}/>
          <Route path="/signup" element={<Register register={register}/>}/>
          <Route path="/signin" element={<Login login={login}/>}/>
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoginIn={isLoginIn}
                children={
                  isLoginIn && <Profile
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
