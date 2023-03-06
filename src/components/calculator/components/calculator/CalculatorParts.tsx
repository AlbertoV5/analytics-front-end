
export const CalculatorHeader = ({title, subtitle}: {title: string, subtitle: string}) => {
  return (
    <header id="calculator-header" className="vstack gap-3">
        <div className="hstack gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-3.1 3.9s-.7-.3-1-.3c-.6-.1-1 .1-1.2 1.1L12 16.8c-.2.8-.5 1.4-1 1.8c-.4.3-.8.4-1.3.4c-.8 0-2-.5-2-.5l.5-1.4s.8.3 1 .3c.3.1.5 0 .7-.1c.2-.1.3-.4.4-.7l1.6-9.2c.1-.8.5-1.4 1-1.9c.6-.4 1.3-.5 2.1-.4c.7.1 1.5.5 1.5.5l-.6 1.3Z"/></svg>
            <h3 className="text-uppercase">{title}</h3>
        </div>
        <h6 className="text-uppercase lh">{subtitle}</h6>
    </header>  
)
}

export const CalculatorOutputs = ({children}: React.PropsWithChildren) => {
    return (
        <div className="container-fluid pt-4 mt-3 border-top vstack gap-2 px-2">
            <div className="row">
                <button type="submit" className="btn btn-success">
                    Calculate
                </button>
            </div>
            <div className="row card bg-info text-light px-0">
                <div className="card-body vstack">
                    <h5>
                        Results
                    </h5>
                    <div className={"w-100 m-0 p-0"}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}