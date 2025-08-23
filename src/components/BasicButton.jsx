import React from 'react'

function BasicButton({
    children,
    type = "button",
    bgcolor = "info",
    textcolor = "text-light",
    clssName = "",
    ...props

}) {
    return (
        <button className={`${bgcolor}, ${textcolor},${clssName}`}{...props}>
            {children}
        </button>
    )
}

export default BasicButton
