export interface OptionResultProps extends React.PropsWithChildren {
    id: string;
    callback?: any;
}

/** HTML list element for dynamic selection and removing. */
export const OptionResult = ({id, children, callback}: OptionResultProps) => {
    return (
        <li id={id} className="list-group-item d-flex justify-content-between align-items-start px-2">
            <div className="ms-2 me-auto">
                {children}
            </div>
            <button 
                type="button" 
                className="btn-close" 
                aria-label="remove" 
                onClick={callback}
            ></button>
        </li>
    )
}