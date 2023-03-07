import { useEffect, useState } from "react";
import { useSession } from "../login/hooks/useSession";
import PatientTable from "./tables/PatientTable";
import DiagnosisTable from "./tables/DiagnosisTable";
import OriginTable from "./tables/OriginTable";

import type { DatabaseVersion } from "../../api";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import VersionInfo from "./components/VersionInfo";
import SearchTable from "./tables/SearchTable";


const queryClient = new QueryClient()

const tabsTitles = [
    "Patient", "Diagnosis", "Origin", "Patient Details"
]
// In case of needing to pass props later, do (props) => <Comp {...props}/>
const tabSelector = [
    () => <PatientTable/>,
    () => <DiagnosisTable/>,
    () => <OriginTable/>,
    () => <SearchTable/>,
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
                    <a className="btn btn-success" href="reports/kardias1">View Report</a>
                </div>
            </div>
            {versionInfo ? <VersionInfo version={versionInfo}></VersionInfo>: null}
            <ul className="nav nav-tabs border-bottom mb-2">
                {tabsTitles.map((item, index) => (
                    <li id={`${item}`} key={item} className="nav-item">
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