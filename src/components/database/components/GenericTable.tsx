interface TableProps extends React.PropsWithChildren {
    header: Array<string>;
    pageSize: number;
}

const GenericTable = ({header, pageSize, children}: TableProps) => {
    return (
        <>
        <section
            id="database-table-section" 
            className="border table-responsive px-3 pt-2"
        >
            <table
                id="database-table"
                className="table table-sm table-hover align-middle"
            >
                <thead id="database-table-head">
                    <tr>
                    {header.map(h => (
                        <th scope="col" key={h} >{h}</th>
                    ))}</tr>
                </thead>
                <tbody
                    id="database-table-body"
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
                                        <span className="placeholder placeholder-s w-100"></span>
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