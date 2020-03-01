import React, { useState, useEffect } from "react";
import filmService from '../services/filmService';
import AddFilmBlock from "./AddFilmBlock/AddFilmBlock";
import TableBlock from "./TableBlock/TableBlock";
import UploadFilmBlock from "./UploadFilmBlock/UploadFilmBlock";

function App() {
  const [films, setFilms] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!films) {
      getFilms();
    }
  })

  const getFilms = async () => {
    let res = await filmService.getAll();
    setFilms(res);
    setMessage('');
  }

  const addFilm = async (title, year, format, stars) => {
    await filmService.addFilm({
      title: title,
      year: year,
      format: format,
      stars: stars
    });
    getFilms();
  };

  const delFilm = async (id) => {
    await filmService.deleteFilm(id);
    getFilms();
  };

  const sortFilms = async () => {
    const sortedFilms = await filmService.sortFilms();
    setFilms(sortedFilms);
  };

  const findFilmByTitle = async (title) => {
    const findedFilm = await filmService.findFilm({ title: title });
    setFilms(findedFilm);
  };

  const findFilmByStar = async (star) => {
    const findedStars = await filmService.findFilm({ stars: star });
    setFilms(findedStars);
  }

  return (
    <div className="container mt-4 jumbotron">
      <h4 className='display-4 text-center mb-4'>Movie Library</h4>
      <UploadFilmBlock message={message} setMessage={setMessage} getFilms={getFilms}/>
      <TableBlock films={films} delFilm={delFilm} setMessage={setMessage} />
      <AddFilmBlock addFilm={addFilm} findFilmByTitle={findFilmByTitle} setMessage={setMessage} findFilmByStar={findFilmByStar} getFilms={getFilms} sortFilms={sortFilms} />
    </div>
  );
}

export default App;