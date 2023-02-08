export interface InputFieldProps extends React.PropsWithChildren {
    id: string;
    name?: string;
}

export const InputField = ({name, id, children}: InputFieldProps) => {
    return (
        <div className="row align-items-center pt-3 border-top">
            <div className="col-6">
                <label htmlFor={id} className="col-form-label">
                    {name}
                </label>
            </div>
            <div className="col-6">
                {children}
            </div>
        </div>
    )
}