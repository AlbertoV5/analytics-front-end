import { useState } from 'react'
import { useSession } from '../login/hooks/useSession';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TableControls from './components/TableControls';
import { Input } from '../login/components/Input';
import { InputField } from '../calculator/components/InputField';

import { fetchPatientPage } from './api/fetch';


const headerData = [
    "ID",
    "Gender",
    "Age",
    "Weight",
    "Height",
    "Cx Prev",
    "RACHS",
    "Stay Days",
    "Expired"
]

const queryClient = new QueryClient()

const PatientTable = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <PatientTableData></PatientTableData>
        </QueryClientProvider>
    )
}

const PatientTableData = () => {

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const { getSession } = useSession();
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['patientData', page],
        queryFn: () => getSession().then(session => 
            fetchPatientPage(session.token, page, pageSize)
            .then(patient => patient)
        ),
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
                        <th scope="col" key={header} style={{width: "80px"}}>{header}</th>
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
                                        <span className="placeholder placeholder-xs w-100"></span>
                                    </td>
                                ))}
                            </tr>
                        ))
                        : data.map(patient => (
                            <tr key={patient.patient_id}>
                                <th scope="row" key={patient.patient_id}>{patient.patient_id}</th>
                            {Object.entries(patient).slice(1).map(([key, value]) => (
                                <td key={key}>{value}</td>
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

export default PatientTable