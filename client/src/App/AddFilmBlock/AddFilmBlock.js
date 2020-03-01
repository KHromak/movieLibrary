import React, { useState } from "react";
import SelectFilmType from './SelectFilmType/SelectFilmType'

export default function AddFilmBlock({ addFilm, findFilmByFormat, findFilmByTitle, findFilmByYear, getFilms, sortFilms, findFilmByStar, setMessage }) {

    let newFilmYear = React.createRef();
    let newFilmTitle = React.createRef();
    let newFilmStars = React.createRef();

    const [filmFormat, setFilmFormat] = useState('');

    let saveFilms = () => {

        const year = newFilmYear.current.value;
        const title = newFilmTitle.current.value;
        const stars = newFilmStars.current.value;
        const format = filmFormat;

        let starsFromStringToArray = (string) => {
            var starsArray = string.split(',');
            return starsArray;
        }

        if (!title || !year || !format || !stars) {
            setMessage('Заполните поля для добавления фильма');
        } else {
            addFilm(title, year, format, starsFromStringToArray(stars));
        }
    };

    let findFilm = () => {
        const title = newFilmTitle.current.value;
        const star = newFilmStars.current.value;
        const year = newFilmYear.current.value;
        const format = filmFormat;
        const messageSearchMovie = 'Поиск фильма';
        const messageSearchActor = 'Поиск по актеру';
        const messageSearchYear = 'Поиск по году';
        const messageSearchFormat = 'Поиск по формату записи';
        const messageAlertFillOneField = 'для поиска заполните только одно поле';
        const messageAlertSelectField = 'Заполните поле для поиска (Актер / Фильм / Год)';

        if (title) {
            if (star || year) {
                setMessage(messageAlertFillOneField);
            }
            else {
                setMessage(messageSearchMovie);
                findFilmByTitle(title);
            }
        }
        else if (star) {
            if (title || year || format) {
                setMessage(messageAlertFillOneField);
            }
            else {
                setMessage(messageSearchActor);
                findFilmByStar(star);
            }
        } else if (year) {
            if (title || star || format) {
                setMessage(messageAlertFillOneField);
            }
            else {
                setMessage(messageSearchYear);
                findFilmByYear(year);
            }
        } else if (format) {
            if (title || star || year) {
                setMessage(messageAlertFillOneField);
            }
            else {
                setMessage(messageSearchFormat);
                findFilmByFormat(format);
            }
        } else {
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
                <input type="number" min="1900" max="2020" aria-label="Film format" placeholder="Год" className="form-control col-sm" ref={newFilmYear}></input>
                <SelectFilmType filmFormat={filmFormat} setFilmFormat={setFilmFormat} />
                <input type="text" aria-label="Film stars" placeholder="Актеры" className="form-control col-sm" ref={newFilmStars}></input>
            </div>
            <div className="mx-auto w-100 btn-group mt-4 center-block border border-white rounded-lg" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-info col-sm" onClick={saveFilms}>Сохранить фильм</button>
                <button type="button" className="btn btn-success col-sm" onClick={findFilm}>Найти фильм</button>
                <button type="button" className="btn btn-danger col-sm" onClick={()=>getFilms('')}>Обновить список</button>
                <button type="button" className="btn btn-warning col-sm" onClick={sortFilms}>Сортировать фильмы</button>
            </div>
        </>
    );

}