interface TableControlsProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const TableControls = ({page, setPage}: TableControlsProps) => {
    const decreasePage = () => {
        setPage(prev => prev - 1 < 0 ? 0 : prev - 1);
    }
    const increasePage = () => {
        setPage(prev => prev + 1);
    }
    return (
        <div className="d-flex mt-2 align-self-center justify-content-start gap-3" style={{height: "40px"}}>
            <ul className="pagination">
                <li className="page-item">
                    <p style={{cursor:"pointer"}} className="page-link" onClick={decreasePage}>Prev</p>
                </li>
                <li className="page-item">
                    <p className="page-link disabled">{page + 1}</p>
                </li>
                <li className="page-item">
                    <p style={{cursor:"pointer"}} className="page-link" onClick={increasePage}>Next</p>
                </li>
                {/* <li className="page-item">
                    <div className="d-flex">
                        <input type="text" className="page-link rounded-0 rounded-end" defaultValue={'Search'}/>
                    </div>
                </li> */}
            </ul>
        </div>
    )
}

export default TableControls