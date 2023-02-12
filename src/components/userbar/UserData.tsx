import { useEffect, useState } from "react";
import { useSession, UserSession } from "../login/hooks/useSession"


interface UserDataProps {
    redirectURL: string;
    redirect?: boolean;
}

/** Verifies the user session with the intent to redirect to log-in.*/
export default function UserData({redirectURL, redirect = true}: UserDataProps) {
    const { getSession } = useSession();
    const [userSession, setUserSession] = useState<UserSession | undefined | null>(undefined);
    
    useEffect(() => {
        getSession()
        .then(session => setUserSession(session))
        .catch(() => setUserSession(null))
    }, [])
    
    if (userSession === undefined)
        return null
    else if (userSession === undefined)
        return null
    
    if (userSession === null){
        const currentUrl = window.location.pathname;
        if (redirect && currentUrl !== redirectURL)
            window.location.href = redirectURL
        return null
    }
    return (
        <div
            id="user-data-info" 
            className='fw-light d-flex justify-content-between w-100'
            style={{listStyleType: "none", paddingLeft: "0px", lineHeight: "1.2em"}}
        >
            <p className="mx-2">Welcome, {userSession.user.username}.</p>
            <p className="mx-2">Your Trial license is valid through 2023.</p>
            {/* {userSession.user.client !== "undefined" 
            ? <p className="mx-2"><b>org: </b>{userSession.user.client}</p>
            : null} */}
        </div>
    )
}