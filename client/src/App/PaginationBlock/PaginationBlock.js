import React from 'react';

const PaginationBlock = ({ getFilms, currentPage, setCurrentPage, filmListSize, setFilmListSize, lastPage }) => {

    const paginationBlockStyle = {
        display: 'flex',
        justifyContent: 'space-between'
    }

    const nextPageClick = async () => {
        if (currentPage >= lastPage) return;
        setCurrentPage(++currentPage);
        await getFilms('', { page: currentPage, size: filmListSize })
    }

    const prevPageClick = async () => {
        if (currentPage === 0) return;
        setCurrentPage(--currentPage);
        await getFilms('', { page: currentPage, size: filmListSize })
    }

    const setListSize = async (size) => {
        setFilmListSize(size);
        await getFilms('', { page: 0, size: size });
        setCurrentPage(0);
    }

    return (
        <div>
            <nav aria-label="Pagination" className="mt-3" style={paginationBlockStyle}>
                <ul className="pagination">
                    <li className="page-item"><div onClick={() => prevPageClick()} className="page-link">	&#8592; Prev</div></li>
                    <li className="block"><div className="input-group-text" >{currentPage + 1}</div></li>
                    <li className="page-item"><div onClick={() => nextPageClick()} className="page-link">Next &#8594;</div></li>
                </ul>
                <ul className="pagination">
                    <li className="block"><div className="input-group-text" >Films per list:</div></li>
                    <li className="page-item"><div onClick={() => setListSize(5)} className="page-link">5</div></li>
                    <li className="page-item"><div onClick={() => setListSize(10)} className="page-link">10</div></li>
                    <li className="page-item"><div onClick={() => setListSize(20)} className="page-link">20</div></li>
                </ul>
            </nav>
        </div>
    )
}

export default PaginationBlock
