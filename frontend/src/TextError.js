import React from 'react'

function TextError(props) {
    return (
        <div style={{color:'tomato'}}>
            {props.children}
        </div>
    )
}

export default TextError