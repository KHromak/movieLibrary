import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ msg, alertColor }) => {

    let messageStyle ={
        'marginBottom': '27px',
        'width': '100%'
    }

    return (
        <div className={alertColor} style={messageStyle} role="alert">
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
