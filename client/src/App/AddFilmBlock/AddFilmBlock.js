import React, { useState } from "react";
import SelectFilmType from './SelectFilmType/SelectFilmType';
import validate from '../../validations/validations'

export default function AddFilmBlock({
    addFilm,
    getFilms,
    sortFilms,
    setMessage,
    setAlertColor,
    findFilmByYear,
    findFilmByStar,
    findFilmByTitle,
    findFilmByFormat,
    pageSizeParamsObject
}) {

    let newFilmYear = React.createRef();
    let newFilmTitle = React.createRef();
    let newFilmStars = React.createRef();

    const [filmFormat, setFilmFormat] = useState('');

    const blueAlertColor = "alert alert-info alert-dismissible fade show";
    const redAlertColor = "alert alert-danger alert-dismissible fade show";

    let saveFilms = () => {

        const year = newFilmYear.current.value;
        const title = newFilmTitle.current.value;
        const stars = newFilmStars.current.value;
        const format = filmFormat;

        let isWrongActorName = validate.isStringContainNumber(stars);
        let isWrongYear = validate.isWrongYear(year);
        let isFormsEmpty = validate.isFormsEmpty(title, year, format, stars);

        let starsFromStringToArray = (string) => {
            var starsArray = string.split(',');
            return starsArray;
        }
        if (isFormsEmpty) {
            setAlertColor(redAlertColor);
            setMessage('Please fill all fields to add movie');
        }
        else if (isWrongYear) {
            setAlertColor(redAlertColor);
            setMessage('Please choose year in period from 1850 to 2020 years');
        }
        else if (isWrongActorName) {
            setAlertColor(redAlertColor);
            setMessage('Actor`s name have not contain the number');
        }
        else {
            addFilm(title, year, format, starsFromStringToArray(stars));
        }
    };

    let findFilm = () => {
        const format = filmFormat;
        const year = newFilmYear.current.value;
        const star = newFilmStars.current.value;
        const title = newFilmTitle.current.value;
        const messageSearchYear = 'Search movie by year';
        const messageSearchMovie = 'Search movie by title';
        const messageSearchActor = 'Search movie by actor';
        const messageSearchFormat = 'Search movie by format';
        const messageAlertSelectField = 'Please fill one field for search by (Title / Year / Format / Actor)';
        const messageAlertFillOneField = 'Please fill only one field for search';


        if (title) {
            if (star || year) {
                setAlertColor(redAlertColor);
                setMessage(messageAlertFillOneField);
            }
            else {
                setAlertColor(blueAlertColor);
                setMessage(messageSearchMovie);
                findFilmByTitle(title);
            }
        }
        else if (star) {
            if (title || year || format) {
                setAlertColor(redAlertColor);
                setMessage(messageAlertFillOneField);
            }
            else {
                setAlertColor(blueAlertColor);
                setMessage(messageSearchActor);
                findFilmByStar(star);
            }
        } else if (year) {
            if (title || star || format) {
                setAlertColor(redAlertColor);
                setMessage(messageAlertFillOneField);
            }
            else {
                setAlertColor(blueAlertColor);
                setMessage(messageSearchYear);
                findFilmByYear(year);
            }
        } else if (format) {
            if (title || star || year) {
                setAlertColor(redAlertColor);
                setMessage(messageAlertFillOneField);
            }
            else {
                setAlertColor(blueAlertColor);
                setMessage(messageSearchFormat);
                findFilmByFormat(format);
            }
        } else {
            setAlertColor(redAlertColor);
            setMessage(messageAlertSelectField);
        }
    }

    return (
        <>
            <div className="input-group mr-2">
                <div className="input-group-prepend">
                    <span className="input-group-text col-sm">Add movie parameters:</span>
                </div>
                <input type="text" aria-label="Film title" placeholder="Movie" className="form-control col-sm" ref={newFilmTitle}></input>
                <input type="number" min="1850" max="2020" aria-label="Film format" placeholder="1850 - 2020 years" className="form-control col-sm" ref={newFilmYear}></input>
                <SelectFilmType filmFormat={filmFormat} setFilmFormat={setFilmFormat} />
                <input type="text" aria-label="Film stars" placeholder="Actors" className="form-control col-sm" ref={newFilmStars}></input>
            </div>
            <div className="mx-auto w-100 btn-group mt-3 center-block border border-white rounded-lg" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-info col-sm" onClick={saveFilms}>Save Movie</button>
                <button type="button" className="btn btn-success col-sm" onClick={findFilm}>Search Movie</button>
                <button type="button" className="btn btn-warning col-sm" onClick={() => getFilms('Refreshed', pageSizeParamsObject)}>Refresh List</button>
                <button type="button" className="btn btn-danger col-sm" onClick={sortFilms}>Sort Movies</button>
            </div>
        </>
    );

}