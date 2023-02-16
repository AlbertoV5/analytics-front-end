import { useEffect, useState } from "react";
import { useSession, UserSession } from "../login/hooks/useSession";

interface UserBarProps {
    redirectURL: string;
    redirect?: boolean;
}

/** Verifies the user session with the intent to redirect to log-in.*/
export default function UserBar({redirectURL, redirect = true}: UserBarProps) {
    const { getSession } = useSession();
    const [session, setSession] = useState<UserSession | undefined | null>(undefined);
    const [message, setMessage] = useState(() => ({
        welcome: 'Welcome.',
        license: 'Please login to access your data.'
    }));
    useEffect(() => {
        getSession()
        .then(session => {
            setSession(session);
            setMessage({
                welcome: `Welcome, ${session.user.name}.`,
                license: `Your license is valid through ${session.user.licenseEnd}.`
            });
        })
        .catch(() => setSession(null))
    }, [])
    
    if (session === null && redirect &&  window.location.pathname !== redirectURL){
        window.location.href = redirectURL
    }
    return (
        <div
            id="user-data-info"
            className='fw-light d-flex justify-content-between w-100'
            style={{listStyleType: "none", paddingLeft: "6px", lineHeight: "1.2em", fontSize: ".95em"}}
        >
            <p className="mx-2">{message.welcome}</p>
            <p className="mx-2 d-none d-md-block">{message.license}</p>
        </div>
    )
}