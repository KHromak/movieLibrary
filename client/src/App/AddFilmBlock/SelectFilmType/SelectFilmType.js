import React from 'react'

export const SelectFilmType = ({ filmFormat, setFilmFormat }) => {

    const handleChange = e => {
        setFilmFormat(e.target.value);
    }

    return (
        
        <select className="custom-select form-control col-sm" id="lang" onChange={handleChange} value={filmFormat}>
            <option value="">Format</option>
            <option value="VHS">VHS</option>
            <option value="DVD">DVD</option>
            <option value="Blu-Ray">Blu-Ray</option>
        </select>
    )
}

export default SelectFilmType;