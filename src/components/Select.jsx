import React, { forwardRef, useId } from 'react'

function Select({
    option,
    label,
    className,
    ...props
}, ref) {

    const id = useId()

    return (
        <div>
            {label && <label htmlFor={id} className=''>{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`${className}`}>
                {option?.map((item) => (
                    <option
                        key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
