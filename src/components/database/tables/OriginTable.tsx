import { useState } from 'react'
import { useSession } from '../../login/hooks/useSession';
import { useQuery } from '@tanstack/react-query'
import { OriginService, OpenAPI } from '../../../client';
import { API_URL } from '../../../config';

import TableControls from '../components/TableControls';
import VersionInfo from '../components/VersionInfo';
import GenericTable from '../components/GenericTable';


const headerData = [
    // "Token",
    "Origin",
    "Latitude",
    "Longitude",
    "Altitude",
]

OpenAPI.BASE = API_URL;

const OriginTable = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const { getSession } = useSession();
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['originData', page],
        queryFn: () => getSession().then(session => {
            OpenAPI.TOKEN = session.token;
            return OriginService.readOriginApiV1OriginGet(page*pageSize, pageSize);
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
                data.result.map((item, index) => (
                    <tr key={`${item.token}${index}`}>
                        {/* <th scope="row" key={item.token}>{item.token}</th> */}
                    {Object.entries(item).slice(1).map(([key, value]) => (
                        <td key={`${item.token}${key}`} className="px-2">{value}</td>
                    ))}</tr>
                )) : null
            }
        </GenericTable>
        <TableControls page={page} setPage={setPage} />
        </>
    )
}

export default OriginTable