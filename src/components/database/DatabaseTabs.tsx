import { useEffect, useState } from "react";
import { useSession } from "../login/hooks/useSession";
import PatientTable from "./tables/PatientTable";
import DiagnosisTable from "./tables/DiagnosisTable";
import OriginTable from "./tables/OriginTable";

import type { DatabaseVersion } from "../../api";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import VersionInfo from "./components/VersionInfo";


const queryClient = new QueryClient()

const tabsTitles = [
    "Patients", "Diagnosis", "Origin", "Search Patient"
]
// In case of needing to pass props later, do (props) => <Comp {...props}/>
const tabSelector = [
    () => <PatientTable/>,
    () => <DiagnosisTable/>,
    () => <OriginTable/>,
    () => <div>Search</div>,
]

export default function DatabaseTabs() {

    const { getSession } = useSession();
    const [ versionInfo, setVersionInfo ] = useState<DatabaseVersion | undefined>(undefined);
    const [ username, setUsername ] = useState<string | undefined>(undefined);
    const [ tab, setTab ] = useState<number>(0);
    
    useEffect(() => {
        getSession()
        .then(session => setUsername(session.user.name))
    }, [])

    return (
        <div className="container-fluid">
            <div className="py-2 d-flex justify-content-between">
                <h4>{username ? `Welcome, ${username}` : null}</h4>
                <div>
                    <button className="btn btn-success">View Report</button>
                </div>
            </div>
            {versionInfo ? <VersionInfo version={versionInfo}></VersionInfo>: null}
            <ul className="nav nav-tabs" style={{borderBottom:"0px"}}>
                {tabsTitles.map((item, index) => (
                    <li key={item} className="nav-item">
                        <button 
                            onClick={() => setTab(index)} 
                            className={`nav-link ${tab === index ? 'active': ''}`}
                        >
                            {tabsTitles[index]}
                        </button>
                    </li> 
                ))}
            </ul>
            <QueryClientProvider client={queryClient}>
                {tabSelector[tab]()}
            </QueryClientProvider>
        </div>
    )
}