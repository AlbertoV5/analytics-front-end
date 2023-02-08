import type React from 'react'

export interface DisabledProps extends React.PropsWithChildren{
    name: string,
    value: string, 
}

export const Locked = ({name, value, children}: DisabledProps) => {
    const id = `${name.toLowerCase()}-input`
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {name}
            </label>
            <input
                type='text'
                className={`form-control`}
                id={id}
                value={value}
                disabled
            />
            <div id={`${id}-help`} className="form-text">
                Locked
            </div>
        </div>
    )
}