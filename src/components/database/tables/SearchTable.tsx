import { useState } from 'react'
import { useSession } from '../../login/hooks/useSession';
import { useQuery } from '@tanstack/react-query'
import { PatientService, OpenAPI } from '../../../api';
import { API_URL } from '../../../config';

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

const headerData2 = [
    "ID",
    "Diagnosis",
    // "English",
    "Code",
    "ICD-11",
]

const headerData3 = [
    // "Token",
    "ID",
    "Origin",
    // "Latitude",
    // "Longitude",
    "Altitude",
]

OpenAPI.BASE = API_URL;

const SearchTable = () => {
    const { getSession } = useSession();
    const [patientID, setPatientID] = useState(0);
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['patientCompleteData', patientID],
        queryFn: () => getSession().then(session => {
            OpenAPI.TOKEN = session.token;
            return PatientService.readRecordsApiV1PatientPatientIdGet(patientID, true);
        }),
        enabled: true,
        keepPreviousData: true
    })
    return (
        <>
        {data?.version ? <VersionInfo version={data.version}></VersionInfo> : null}
        <div className='row pt-2'>
            <form className='col-3' onSubmit={(e) => {e.preventDefault()}}>
                <div className="vstack gap-2 mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><b>Search Patient ID</b></label>
                    <input type="number" className="form-control" min={0} max={999999999}
                        value={patientID} onChange={(e) => setPatientID(Number.parseInt(e.target.value))}
                    />
                    {/* <button type="submit" className='btn btn-success'>Search</button> */}
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
            </form>
            <div className='vstack gap-1 col-9'>
                <GenericTable header={headerData} pageSize={1}>{
                    data ? data.result.map(item => (
                        <tr key={item.patient.patient_id}>
                            <th scope="row" key={item.patient.patient_id}>{item.patient.patient_id}</th>
                        {Object.entries(item.patient).slice(1).map(([key, value]) => (
                            <td key={key} className="px-2">{value}</td>
                        ))}</tr>
                    )) : null
                }</GenericTable>
                <GenericTable header={headerData3} pageSize={1}>{
                    data ? data.result.map(item => (
                        <tr key={item.origin?.token}>
                            <th scope="row" key={item.patient.patient_id}>{item.patient.patient_id}</th>
                        {Object.entries(item.origin?item.origin:{}).slice(1).filter(([key, value]) => key != "lat" && key != "lng").map(([key, value]) => (
                            <td key={key} className="px-2">{value}</td>
                        ))}</tr>
                    )) : null
                }</GenericTable>
                <GenericTable header={headerData2} pageSize={1}>{
                    data ? data.result[0]?.diagnosis?.map((item, index) => (
                        <tr key={`${item.token}${index}`}>
                            <th scope="row" key={`${index}${data.result[0]?.patient.patient_id}`}>{data.result[0]?.patient.patient_id}</th>
                        {Object.entries(item).slice(1).filter(([key, value]) => key != "diagnosis_en").map(([key, value]) => (
                            <td key={key} className="px-2">{value}</td>
                        ))}</tr>
                    )) : null
                }</GenericTable>
            </div>
        </div>
        {/* <TableControls page={page} setPage={setPage} /> */}
        </>
    )
}

export default SearchTable