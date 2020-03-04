import React, { useState } from "react";
import SelectFilmType from './SelectFilmType/SelectFilmType';
import validate from '../../validations/validations'

export default function AddFilmBlock({ setAlertColor, addFilm, findFilmByFormat, findFilmByTitle, findFilmByYear, getFilms, sortFilms, findFilmByStar, setMessage }) {

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

        console.log(isWrongYear, "isWrongYear")

        let starsFromStringToArray = (string) => {
            var starsArray = string.split(',');
            return starsArray;
        }
        if ( isFormsEmpty ) {
            setAlertColor(redAlertColor);
            setMessage('Заполните поля для добавления фильма');
        } 
        else if ( isWrongYear ) {
            setAlertColor(redAlertColor);
            setMessage('Выберите год с 1850 по 2020 г.г.');
        }
        else if ( isWrongActorName ) {
            setAlertColor(redAlertColor);
            setMessage('Имя актера не должно содержать чисел');
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
        const messageSearchYear = 'Поиск по году';
        const messageSearchMovie = 'Поиск фильма';
        const messageSearchActor = 'Поиск по актеру';
        const messageSearchFormat = 'Поиск по формату записи';
        const messageAlertSelectField = 'Заполните поле для поиска (Фильм / Год / Формат / Актер)';
        const messageAlertFillOneField = 'для поиска заполните только одно поле';


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
                    <span className="input-group-text col-sm"> Введите параметры фильма:</span>
                </div>
                <input type="text" aria-label="Film title" placeholder="Фильм" className="form-control col-sm" ref={newFilmTitle}></input>
                <input type="number" min="1850" max="2020" aria-label="Film format" placeholder="1850г - 2020г" className="form-control col-sm" ref={newFilmYear}></input>
                <SelectFilmType filmFormat={filmFormat} setFilmFormat={setFilmFormat} />
                <input type="text" aria-label="Film stars" placeholder="Актеры" className="form-control col-sm" ref={newFilmStars}></input>
            </div>
            <div className="mx-auto w-100 btn-group mt-4 center-block border border-white rounded-lg" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-info col-sm" onClick={saveFilms}>Сохранить фильм</button>
                <button type="button" className="btn btn-success col-sm" onClick={findFilm}>Найти фильм</button>
                <button type="button" className="btn btn-warning col-sm" onClick={()=>getFilms('')}>Обновить список</button>
                <button type="button" className="btn btn-danger col-sm" onClick={sortFilms}>Сортировать фильмы</button>
            </div>
        </>
    );

}