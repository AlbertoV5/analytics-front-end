import { useEffect, useState } from "react";
import { useSession, UserSession } from "../login/hooks/useSession";
import PatientTable from "./PatientTable";
import DiagnosisTable from "./DiagnosisTable";

import type { DatabaseVersion } from "../../api";

import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import VersionInfo from "./components/VersionInfo";
const queryClient = new QueryClient()


export interface TableProps {
    versionCallback: React.Dispatch<React.SetStateAction<DatabaseVersion | undefined>>;
}

const tabSelector = [
    () => <div>Search</div>,
    (props: TableProps) => <PatientTable {...props}/>,
    (props: TableProps) => <DiagnosisTable {...props}/>,
    () => <div></div>,
]

const tabs = [
    "Search", "Patients", "Diagnosis", "Origin"
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
        <div>
            <h3 className="pb-2">{username ? `Welcome, ${username}` : null}</h3>
            {
                versionInfo ? 
                <VersionInfo version={versionInfo}></VersionInfo>
                : null
            }
            <ul className="nav nav-tabs" style={{borderBottom:"0px"}}>
                <li className="nav-item">
                    <a onClick={() => setTab(0)} className={`nav-link ${tab === 0 ? 'active': ''}`}href="#">{tabs[0]}</a>
                </li>
                <li className="nav-item">
                    <a onClick={() => setTab(1)} className={`nav-link ${tab === 1 ? 'active': ''}`} href="#">{tabs[1]}</a>
                </li>
                <li className="nav-item">
                    <a onClick={() => setTab(2)} className={`nav-link ${tab === 2 ? 'active': ''}`} href="#">{tabs[2]}</a>
                </li>
                <li className="nav-item">
                    <a onClick={() => setTab(3)} className={`nav-link ${tab === 3 ? 'active': ''}`} href="#">{tabs[3]}</a>
                </li>
            </ul>
            <QueryClientProvider client={queryClient}>
                {tabSelector[tab]({versionCallback: setVersionInfo})}
            </QueryClientProvider>
        </div>
    )
}