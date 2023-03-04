import { useState } from "react";

interface TableControlsProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const TableControls = ({page, setPage}: TableControlsProps) => {
    
    return (
        <div className="d-flex mt-2 align-self-center justify-content-start gap-3" style={{height: "40px"}}>
            <ul className="pagination">
                <li className="page-item">
                    <p style={{cursor:"pointer"}} className="page-link" onClick={() => setPage(prev => prev - 1)}>Prev</p>
                </li>
                <li className="page-item">
                    <p className="page-link disabled">{page + 1}</p>
                </li>
                <li className="page-item">
                    <p style={{cursor:"pointer"}} className="page-link" onClick={() => setPage(prev => prev + 1)}>Next</p>
                </li>
                <li className="page-item">
                <div className="d-flex">
                    {/* <label className="form-label" style={{width: "200px"}}>
                        Search
                    </label> */}
                    <input type="text" className="page-link rounded-0 rounded-end" defaultValue={'Search'}
                    // value={searchData} onChange={(e) => setSearchData(e.target.value)}
                    />
                    {/* <button type="submit" className='btn btn-success'>Search</button> */}
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                </li>
            </ul>
        </div>
    )
}

export default TableControls