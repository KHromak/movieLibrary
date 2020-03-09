import React, { useState } from 'react';

import { Modal, Button } from 'react-bootstrap';



export const TableBlock = ({ films, deleteFilm, setMessage }) => {

    const [filmId, setFilmId] = useState('');
    const [filmYear, setFilmYear] = useState('');
    const [filmTitle, setFilmTitle] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

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
                    <Button variant="outline-danger" onClick={()=>{
                        handleShow()
                        setFilmId(film.id)
                        setFilmTitle(film.title)
                        setFilmYear(film.year)
                        }}>x</Button>
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
                            setMessage('Movies not found, please upload movies')
                        )}

                </tbody>
            </table>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deleting movie {filmTitle} ({filmYear})</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete movie?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                            </Button>
                    <Button variant="primary" onClick={() => {
                        deleteFilm(filmId)
                        handleClose()
                    } }>
                        Delete Movie
                            </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TableBlock;