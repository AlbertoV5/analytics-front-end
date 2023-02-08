import { useEffect, useState } from "react";
import { useSession, UserSession } from "../login/hooks/useSession"


export default function UserData() {
    const { getSession } = useSession();
    const [userSession, setUserSession] = useState<UserSession | undefined | null>(undefined);
    
    useEffect(() => {
        getSession()
        .then(session => setUserSession(session))
        .catch(() => setUserSession(null))
    }, [])
    
    if (userSession === undefined)
        return null
    
    if (userSession === null){
        window.location.href="/login"
        return null
    }
    return (
        <ul 
            id="database-user-data" 
            className='text-start' 
            style={{listStyleType: "none", paddingLeft: "0px"}}
        >
            <li><b>User: </b>{userSession.user.username}</li>
            <li><b>Org: </b>{userSession.user.client}</li>
        </ul>
    )
}