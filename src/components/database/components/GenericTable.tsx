interface TableProps extends React.PropsWithChildren {
    header: Array<string>;
    pageSize: number;
}

const GenericTable = ({header, pageSize, children}: TableProps) => {
    return (
        <>
        <section
            id="patient-table-section" 
            className="border table-responsive px-3 pt-2"
        >
            <table
                id="patient-table"
                className="table table-sm table-hover align-middle"
            >
                <thead id="patient-table-head">
                    <tr>
                    {header.map(h => (
                        <th scope="col" key={h} style={{width: "80px"}}>{h}</th>
                    ))}</tr>
                </thead>
                <tbody
                    id="patient-table-body"
                    style={{overflowY: "hidden", fontSize: ".9em"}}
                >
                    {
                        children === null ? 
                        [...Array(pageSize).keys()].map((_, index) => (
                            <tr key={index}>
                                {header.map((header, index) => (
                                    <td key={`${header}-${index}`} 
                                        className="card-text placeholder-glow"
                                    >
                                        <span className="placeholder placeholder-xs w-100"></span>
                                    </td>
                                ))}
                            </tr>
                        ))
                        : children
                    }
                </tbody>
            </table>
        </section>
        </>
    )
}

export default GenericTable