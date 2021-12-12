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

function App() {
  const [isOpen , setOpen] = React.useState(false);
  const [movieList, setMovieList] = React.useState([]);
  const [movieSavedList, setMovieSavedList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFavourite, setFavourite] = React.useState(false);
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
  
  function changeFavouriteStatus() {
    movieApi.changeFavouriteMovie(isFavourite)
      .then((res) => {
        console.log(res)
        setFavourite(true)
      })
      .catch((err) => {
        console.log(err)
      })
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
    <div className="page">
      <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/" element={<Main openSideBar={openSideBar} closeSideBar={closeSideBar} isOpen={isOpen}/>}/>
        <Route path="/signup" element={<Register />}/>
        <Route path="/signin" element={<Login />}/>
        <Route path="/profile" element={<Profile openSideBar={openSideBar} closeSideBar={closeSideBar} isOpen={isOpen}/>
        }/>
        <Route path="/movies" element={<Movies isFavourite={isFavourite} handleClick={changeFavouriteStatus} isLoading={isLoading} movieList={movieList} openSideBar={openSideBar} closeSideBar={closeSideBar} isOpen={isOpen}/>
        }/>
        <Route path="/saved-movies" element={<SavedMovies movieSavedList={movieSavedList} openSideBar={openSideBar} closeSideBar={closeSideBar} isOpen={isOpen}/>}/>
      </Routes>
    </div>
  );
}

export default App;
