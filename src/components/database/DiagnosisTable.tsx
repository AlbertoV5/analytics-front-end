import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { API_URL, getHeaders } from '../config';
import { useSession } from '../login/hooks/useSession';


export interface TableData {
    token: string;
    diagnosis: string;
    diagnosis_en: string;
    icd11_code: string;
    icd11_title: string;
}

const headerData = [
    // "Token",
    "Diagnosis",
    "English",
    "Code",
    "ICD-11",
]

const DiagnosisTable = () => {

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const { getSession } = useSession();
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['diagnosisData', page],
        queryFn: () => getSession()
        .then(session => 
            fetch(`${API_URL}/diagnosis/?offset=${page*pageSize}&limit=${pageSize}`, {
                method:'GET',
                headers: getHeaders(session.token)
            })
            .then(response => response.json())
            .then(data => data as TableData[])
        ).catch(() => []),
        enabled: true
    })
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
                    {headerData.map(header => (
                        <th scope="col" key={header}>{header}</th>
                    ))}</tr>
                </thead>
                <tbody
                    id="patient-table-body"
                    style={{overflowY: "hidden", fontSize: ".9em"}}
                >
                    {
                        !data ?
                        [...Array(pageSize).keys()].map((_, index) => (
                            <tr key={index}>
                                {headerData.map((header, index) => (
                                    <td key={`${header}-${index}`} 
                                        className="card-text placeholder-glow"
                                    >
                                        <span className="placeholder placeholder w-100"></span>
                                    </td>
                                ))}
                            </tr>
                        ))
                        : data.map(diagnosis => (
                            <tr key={diagnosis.token}>
                                {/* <th scope="row" key={diagnosis.token}>{diagnosis.token}</th> */}
                            {Object.entries(diagnosis).slice(1).map(([key, value]) => (
                                <td key={key} className="px-2">{value}</td>
                            ))}</tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
        <section 
            id="patient-table-controls"
            className='py-2'
        >
            <ul className="pagination">
                <li className="page-item">
                    <a type="button" className="page-link" onClick={() => setPage(prev => prev - 1)}>Prev</a>
                </li>
                <li className="page-item">
                    <p className="page-link disabled">{page + 1}</p>
                </li>
                <li className="page-item">
                    <a type="button" className="page-link" onClick={() => setPage(prev => prev + 1)}>Next</a>
                </li>
            </ul>
        </section>
        </>
    )
}

export default DiagnosisTable