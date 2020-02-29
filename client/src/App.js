import React, { useState, useEffect } from "react";
import filmService from './services/filmService';
import AddFilmBlock from "./AddFilmBlock";
import TableBlock from "./TableBlock";
import UploadFilmBlock from "./UploadFilmBlock";


function App() {
  const [films, setFilms] = useState(null);
  const [message, setMessage] = useState('');
  // const [file, setFile] = useState('');

  useEffect(() => {
    if (!films) {
      getFilms();
    }
  })

  const getFilms = async () => {
    let res = await filmService.getAll();
    console.log(res);
    setFilms(res);
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

  const findFilmByName = async (title) => {
    const findedFilm = await filmService.findFilmByName({ title: title });
    setFilms(findedFilm);
  };

  return (
    <div className="container mt-4 jumbotron">
      <h4 className='display-4 text-center mb-4'>Movie Library</h4>
      <UploadFilmBlock message={message} setMessage={setMessage}/>
      <TableBlock films={films} delFilm={delFilm} />
      <AddFilmBlock addFilm={addFilm} findFilmByName={findFilmByName} getFilms={getFilms} sortFilms={sortFilms} />
    </div>
  );
}

export default App;