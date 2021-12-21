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

function App() {
  const [isOpen , setOpen] = React.useState(false);
  const [movieList, setMovieList] = React.useState([]);
  const [movieSavedList, setMovieSavedList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFavourite, setFavourite] = React.useState(false);
  const [isLoginIn, setIsLoginIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const location = useLocation();
  const navigate = useNavigate();

  function getMovies() {
    setIsLoading(true);
    movieApi.getAllMovies()
      .then((res) => {
        setMovieList(res);
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
        console.log(res)
        setMovieSavedList(res);
        setIsLoading(false);
      })
      .catch(err => console.log(err))
  }
  
  function setFavouriteStatus(data) {
    mainApi.setFavouriteMovie(data)
    .then(res => console.log(res))
    .catch((err) => console.log(err))
  }

  function deleteFavouriteMovie(id) {
    mainApi.deleteFavouriteMovie(id)
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

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then(() => {
          console.log('токен есть')
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
  
  React.useEffect(() => {
    if (location.pathname === '/movies') {
      getMovies();
    } else if (location.pathname === '/saved-movies') {
      getSavedMovies();
    }
    },[location.pathname])

  function openSideBar() {
    setOpen(true);
  }
    
  function closeSideBar() {
    setOpen(false)
  }

  React.useEffect(() => {
    getCurrentUser()
  }, [])

  React.useEffect(() => {
    checkToken();
    console.log(localStorage.getItem('jwt'))
  }, [isLoginIn, currentUser])

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
                    isFavourite={isFavourite} 
                    isLoading={isLoading} 
                    movieList={movieList}
                    movieSavedList={movieSavedList}
                    openSideBar={openSideBar} 
                    closeSideBar={closeSideBar} 
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
