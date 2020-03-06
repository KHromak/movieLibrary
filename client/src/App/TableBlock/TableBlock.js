import React from 'react';

export const TableBlock = ({ films, delFilm, setMessage }) => {

    const myCustomTable = {
        position: 'relative',
        height: '350px',
        overflow: 'auto',
        display: 'block'
    }

    const starsListStyle = {
        marginBottom: '2px'
    }

    const renderFilms = (film, index) => {
        return (
            <tr key={film.id}>
                <th scope="row">{index + 1}</th>
                <td>{film.title}</td>
                <td>{film.year}</td>
                <td>{film.format}</td>
                <td>
                    {film.stars.map((star, index) =>
                        <p key={index} style={starsListStyle}>{star}</p>
                    )}
                </td>
                <td>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => delFilm(film.id)}><span aria-hidden="true">&times;</span>
            </button> 

                    {/* <div type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={() => delFilm(film.id)}>x</div> */}
                </td>
            </tr>
        );
    };
    
    return (
        <div className="my-custom-table mt-2 small" style={myCustomTable}>
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
                        films.map((film) => renderFilms(film, film.index))
                    ) : (
                            setMessage('Movies not found')
                        )}

                </tbody>
            </table>
        </div>
    )
}

export default TableBlock;