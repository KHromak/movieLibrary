import React, { useState, useEffect } from "react";
import SelectFilmType from './SelectFilmType'

export default function AddFilmBlock(props) {

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
            return console.log('please fill the inputs!')
        } else {
            props.addFilm(title, year, format, starsFromStringToArray(stars));
        }
    };

    let findFilmByName = () => {
        const title = newFilmTitle.current.value;
        if (!title) {
            return console.log('please fill the title!')
        } else {
            props.findFilmByName(title);
        }
    }


    return (
        <>
            <div className="input-group mr-2">
                <div className="input-group-prepend">
                    <span className="input-group-text col-sm">  Введите параметры фильма:</span>
                </div>
                <input type="text" aria-label="Film title" placeholder="Название" className="form-control col-sm" ref={newFilmTitle}></input>
                <input type="number" min="1900" max="2020" aria-label="Film format" placeholder="Год" className="form-control col-sm" ref={newFilmYear}></input>
                <SelectFilmType filmFormat={filmFormat} setFilmFormat={setFilmFormat}/>
                <input type="text" aria-label="Film stars" placeholder="Актеры" className="form-control col-sm" ref={newFilmStars}></input>
                
            </div>
            <div className="mx-auto w-100 btn-group mt-4 center-block border border-white rounded-lg" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-info col-sm" onClick={saveFilms}>Сохранить фильм</button>
                <button type="button" className="btn btn-success col-sm" onClick={findFilmByName}>Найти по имени</button>
                <button type="button" className="btn btn-danger col-sm" onClick={props.getFilms}>показать фильмы</button>
                <button type="button" className="btn btn-warning col-sm" onClick={props.sortFilms}>сортировать фильмы</button>
            </div>

        </>
    );

}