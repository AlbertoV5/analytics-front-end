import { useState } from 'react'
import { useSession } from '../../login/hooks/useSession';
import { useQuery } from '@tanstack/react-query'
import { PatientService, OpenAPI } from '../../../client';
import { API_URL } from '../../../config';

import TableControls from '../components/TableControls';
import VersionInfo from '../components/VersionInfo';
import GenericTable from '../components/GenericTable';


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

const PatientTable = () => {
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
    return (
        <>
        {data?.version ? <VersionInfo version={data.version}></VersionInfo> : null}
        <GenericTable header={headerData} pageSize={pageSize} >
            {
                data ?
                data.result.map(patient => (
                    <tr key={patient.patient_id}>
                        <th scope="row" key={patient.patient_id}>{patient.patient_id}</th>
                    {Object.entries(patient).slice(1).map(([key, value]) => (
                        <td key={key} className="px-2">{value}</td>
                    ))}</tr>
                )) : null
            }
        </GenericTable>
        <TableControls page={page} setPage={setPage} />
        </>
    )
}

export default PatientTable