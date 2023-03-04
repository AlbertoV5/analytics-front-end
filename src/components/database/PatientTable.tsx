import { useState } from 'react'
import { useSession } from '../login/hooks/useSession';
import { useQuery } from '@tanstack/react-query'
import { PatientService, OpenAPI } from '../../api';
import { API_URL } from '../../config';

import TableControls from './components/TableControls';
import type { TableProps } from './DatabaseTabs';


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

OpenAPI.BASE = API_URL;

const PatientTable = ({versionCallback}: TableProps) => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const { getSession } = useSession();
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['patientData', page],
        queryFn: () => getSession().then(session => {
            OpenAPI.TOKEN = session.token;
            return PatientService.readRecordsApiV1PatientGet(page*pageSize, pageSize);
        }),
        enabled: true,
        keepPreviousData: true
    })
    versionCallback(data?.version);
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
                        : data.result.map(patient => (
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