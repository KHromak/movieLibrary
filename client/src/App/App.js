import React, { useState, useEffect } from "react";
import TableBlock from "./TableBlock/TableBlock";
import filmService from "../services/filmService";
import AddFilmBlock from "./AddFilmBlock/AddFilmBlock";
import UploadFilmBlock from "./UploadFilmBlock/UploadFilmBlock";
import PaginationBlock from "./PaginationBlock/PaginationBlock"

function App() {

  const [films, setFilms] = useState(null);
  const [message, setMessage] = useState('');
  const [alertColor, setAlertColor] = useState("alert alert-info alert-dismissible fade show");
  const [currentPage, setCurrentPage] = useState(0);
  const [filmListSize, setFilmListSize] = useState(5);
  const [lastPage, setLastPage] = useState(0);

  const jumboStyle = { padding: "1rem 2rem" };
  const redAlertColor = "alert alert-danger alert-dismissible fade show";
  const blueAlertColor = "alert alert-info alert-dismissible fade show";
  const pageSizeParamsObject = { page: currentPage, size: filmListSize }

  useEffect(() => {
    if (!films) {
      getFilms('', pageSizeParamsObject);
    }
  });

  const getFilms = async (message = '', params) => {
    let res = await filmService.getAll(params);
    setFilms(res);
    setLastPage(res[0].lastPage)
    setAlertColor(blueAlertColor);
    setMessage(message);
  };

  const addFilm = async (title, year, format, stars) => {
    let res = await filmService.addFilm({
      title: title,
      year: year,
      format: format,
      stars: stars
    });
    getFilms(res.data.msg, pageSizeParamsObject);
  };

  const delFilm = async (id) => {
    await filmService.deleteFilm(id);
    getFilms('', pageSizeParamsObject);
  };

  const sortFilms = async () => {
    const sortedFilms = await filmService.sortFilms(pageSizeParamsObject);
    setFilms(sortedFilms);
  };

  const findFilmByTitle = async (title) => {
    const findedByTitle = await filmService.findFilm({ title: title });
    setFilms(findedByTitle);
  };

  const findFilmByYear = async (year) => {
    const findedByYear = await filmService.findFilm({ year: year });
    setFilms(findedByYear);
  };

  const findFilmByFormat = async (format) => {
    const findedByFormat = await filmService.findFilm({ format: format });
    setFilms(findedByFormat);
  };

  const findFilmByStar = async (star) => {
    const findedByStars = await filmService.findFilm({ stars: star });
    console.log(findedByStars, 'findedByStars')
    setFilms(findedByStars);
  };

  return (
    <div className="container mt-3 jumbotron" style={jumboStyle}>
      <UploadFilmBlock
        message={message}
        getFilms={getFilms}
        setMessage={setMessage}
        alertColor={alertColor} 
        pageSizeParamsObject={pageSizeParamsObject}
        />
      <PaginationBlock
        getFilms={getFilms}
        lastPage={lastPage}
        currentPage={currentPage}
        filmListSize={filmListSize}
        setCurrentPage={setCurrentPage} 
        pageSizeParamsObject={pageSizeParamsObject}
        />
      <TableBlock
        films={films}
        delFilm={delFilm}
        setMessage={setMessage} />
      <AddFilmBlock
        addFilm={addFilm}
        getFilms={getFilms}
        sortFilms={sortFilms}
        setMessage={setMessage}
        setAlertColor={setAlertColor}
        findFilmByStar={findFilmByStar}
        findFilmByYear={findFilmByYear}
        findFilmByTitle={findFilmByTitle}
        findFilmByFormat={findFilmByFormat} 
        pageSizeParamsObject={pageSizeParamsObject}
        />
    </div>
  );
}

export default App;