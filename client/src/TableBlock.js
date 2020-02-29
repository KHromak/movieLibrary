import React from 'react';

export const TableBlock = ({ films, delFilm }) => {

    const myCustomScrollbar = {
        position: 'relative',
        height: '300px',
        overflow: 'auto',
        display: 'block'
    }

    const renderFilms = (film, index) => {
        return (
            <tr key={film._id}>
                <th scope="row">{index + 1}</th>
                <td>{film.title}</td>
                <td>{film.year}</td>
                <td>{film.format}</td>
                <td>
                    {film.stars.map((star, index) => 
                    <p key={index}>{star}</p>
                )}   
                </td>
                <td><div type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={() => delFilm(film._id)}>x</div></td>
            </tr>
        );
    };



    return (
        <div className="table-wrapper-scroll-y my-custom-scrollbar mt-2" style={myCustomScrollbar}>
            <table className="table table-striped mb-0">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Year</th>
                        <th scope="col">Format</th>
                        <th scope="col">Stars</th>
                    </tr>
                </thead>
                <tbody>

                    {(films && films.length > 0) ? (
                        films.map((film, index) => renderFilms(film, index))
                    ) : (
                            <tr>
                                <td>Фильмы не найдены</td>
                            </tr>
                        )}

                </tbody>
            </table>
        </div>
    )
}

export default TableBlock;