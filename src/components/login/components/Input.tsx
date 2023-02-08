import type React from 'react'

export interface FormError {
    message: string;
    isInvalid: boolean;
}

export interface InputProps extends React.PropsWithChildren{
    name: string,
    type: string,
    value: string, 
    setValue: Function,
    required?: boolean,
    error?: FormError,
    children?: React.ReactNode | string
}

export const Input = ({name, type, value, setValue, required, error, children}: InputProps) => {
    const id = `${name.toLowerCase()}-input`
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {name}
            </label>
            <input
                type={type} 
                className={`form-control ${error?.isInvalid?"is-invalid":""}`}
                id={id}
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                required={required?required:false}
            />
            {required ?
            <div id={`${id}-help`} className="form-text">
                Required
            </div> 
            : null}
        </div>
    )
}