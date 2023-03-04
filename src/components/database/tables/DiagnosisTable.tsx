import { useState } from 'react'
import { useSession } from '../../login/hooks/useSession';
import { useQuery } from '@tanstack/react-query'
import TableControls from '../components/TableControls';

import { API_URL } from '../../../config';
import { DiagnosisService, OpenAPI } from '../../../api';
import GenericTable from '../components/GenericTable';

import VersionInfo from '../components/VersionInfo';

const headerData = [
    // "Token",
    "Diagnosis",
    "English",
    "Code",
    "ICD-11",
]

OpenAPI.BASE = API_URL;

const DiagnosisTable = () => {

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const { getSession } = useSession();
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['diagnosisData', page],
        queryFn: () => getSession().then(session => {
            OpenAPI.TOKEN = session.token;
            return DiagnosisService.readDiagnosisApiV1DiagnosisGet(page*pageSize, pageSize, false)
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
                    data.result.map(diagnosis => (
                        <tr key={diagnosis.token}>
                            {/* <th scope="row" key={diagnosis.token}>{diagnosis.token}</th> */}
                        {Object.entries(diagnosis).slice(1).map(([key, value]) => (
                            <td key={key} className="px-2">{value}</td>
                        ))}</tr>
                    )) : null
                }
            </GenericTable>
            <TableControls page={page} setPage={setPage} />
        </>
    )
}

export default DiagnosisTable