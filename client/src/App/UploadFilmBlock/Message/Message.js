import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ msg, alertColor }) => {

    
    return (
        <div className={alertColor} role="alert">
            <strong>{msg}</strong>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

Message.propTypes = {
    msg: PropTypes.string.isRequired,
}

export default Message
