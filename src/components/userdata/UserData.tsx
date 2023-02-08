import { useEffect, useState } from "react";
import { useSession, UserSession } from "../login/hooks/useSession"

const divHeight = "80px";

interface UserDataProps {
    redirectURL: string;
    show?: boolean;
}

/** Verifies the user session with the intent to redirect to log-in.*/
export default function UserData({redirectURL, show = true}: UserDataProps) {
    const { getSession } = useSession();
    const [userSession, setUserSession] = useState<UserSession | undefined | null>(undefined);
    
    useEffect(() => {
        getSession()
        .then(session => setUserSession(session))
        .catch(() => setUserSession(null))
    }, [])
    
    if (userSession === undefined && show)
        return (<div style={{height: divHeight}}></div>)
    else if (userSession === undefined)
        return null
    
    if (userSession === null){
        window.location.href = redirectURL
        return null
    }
    if (!show)
        return null
    return (
        <div style={{height: divHeight}}>
            <ul
                id="user-data-info" 
                className='text-start' 
                style={{listStyleType: "none", paddingLeft: "0px"}}
            >
                <li><b>User: </b>{userSession.user.username}</li>
                <li><b>Org: </b>{userSession.user.client}</li>
            </ul>
        </div>
    )
}