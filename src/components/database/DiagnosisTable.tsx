import { useState } from 'react'
import { useSession } from '../login/hooks/useSession';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TableControls from './components/TableControls';

import { DiagnosisService, OpenAPI } from '../../api/crud';
import { API_URL } from '../../api/config';

const headerData = [
    // "Token",
    "Diagnosis",
    "English",
    "Code",
    "ICD-11",
]

OpenAPI.BASE = API_URL;
const queryClient = new QueryClient()

const DiagnosisTable = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <DiagnosisTableData></DiagnosisTableData>
        </QueryClientProvider>
    )
}

const DiagnosisTableData = () => {

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const { getSession } = useSession();
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['diagnosisData', page],
        queryFn: () => getSession().then(session => {
            OpenAPI.TOKEN = session.token;
            return DiagnosisService.readDiagnosisApiV1DiagnosisGet(page*pageSize, pageSize)
        }),
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
                                        <span className="placeholder w-100"></span>
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
        <TableControls page={page} setPage={setPage} />
        </>
    )
}

export default DiagnosisTable