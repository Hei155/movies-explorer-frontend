import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { Register } from '../Register/Register.js';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { NotFound } from '../NotFound/NotFound';

function App() {
  const [isOpen , setOpen] = React.useState(false);
  const [movieList, setMovieList] = React.useState([]);
  const [movieSavedList, setMovieSavedList] = React.useState([]);

  React.useEffect(() => {
    const cards = [];
    const savedCards = [];
    const card = {
      src: 'https://approvecode.com/wp-content/uploads/2020/04/Preloader-na-html-i-css.png',
      alt: "фото",
      text: "Тест",
      duration: "1ч2м"
    }
    const savedCard = {
      src: 'https://approvecode.com/wp-content/uploads/2020/04/Preloader-na-html-i-css.png',
      alt: "фото",
      text: "Тест",
      duration: "1ч2м"
    }
    for (let i = 0; i < 33; i++) {
      cards.push(card);
    }
    for (let i = 0; i < 4; i++) {
      savedCards.push(savedCard);
    }
    setMovieSavedList(savedCards)
    setMovieList(cards)
    },[])

  function openSideBar() {
    console.log(isOpen)
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
        <Route path="/movies" element={<Movies movieList={movieList} openSideBar={openSideBar} closeSideBar={closeSideBar} isOpen={isOpen}/>
        }/>
        <Route path="/saved-movies" element={<SavedMovies movieSavedList={movieSavedList} openSideBar={openSideBar} closeSideBar={closeSideBar} isOpen={isOpen}/>}/>
      </Routes>
    </div>
  );
}

export default App;
