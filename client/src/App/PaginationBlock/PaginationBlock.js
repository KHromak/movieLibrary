import React,{ useEffect } from 'react';

const PaginationBlock = ({ getFilms, currentPage, setCurrentPage, filmListSize, pageSizeParamsObject }) => {

    const nextPageClick = async () => {
        setCurrentPage(++currentPage);
        await getFilms('', { page: currentPage, size: filmListSize })
    }

    const prevPageClick = async () => {
        if (currentPage === 0) return;
        setCurrentPage(--currentPage);
        await getFilms('', { page: currentPage, size: filmListSize })
    }

    const numPageClick = async (numPage) => {
        if (numPage === 0) return;
        setCurrentPage(numPage);
        await getFilms('', pageSizeParamsObject)
    }

    return (
        <div>
            <nav aria-label="Pagination" className="mt-3">
                <ul className="pagination">
                    <li className="page-item"><div onClick={() => prevPageClick()} className="page-link" >Previous</div></li>
                    <li className="page-item"><div onClick={() => numPageClick(currentPage)} className="page-link" >{currentPage + 1}</div></li>
                    <li className="page-item"><div onClick={() => numPageClick(currentPage + 1)} className="page-link" >{currentPage + 2}</div></li>
                    <li className="page-item"><div onClick={() => numPageClick(currentPage + 2)} className="page-link" >{currentPage + 3}</div></li>
                    <li className="page-item"><div onClick={() => nextPageClick()} className="page-link" >Next</div></li>
                </ul>
            </nav>
        </div>
    )
}

export default PaginationBlock
