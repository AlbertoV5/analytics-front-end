import { useState, useEffect } from "react";
import { useSession } from "./hooks/useSession";
import type { CognitoUser } from "amazon-cognito-identity-js";

import NewPassForm from "./NewPassForm";
import LogoutForm from "./LogoutForm";
import LoginForm from "./LoginForm";


export type FormState = 'login' | 'newPass' | 'logout' | '';
export interface Payload {
    user?: CognitoUser;
    attributes?: Object; // define if needed later
}
export interface AuthFlowFormProps {
    setForm: React.Dispatch<React.SetStateAction<FormState>>;
    setPayload: React.Dispatch<React.SetStateAction<Payload>>;
    redirect_url: string;
    payload?: Payload;
}

/** Parent component for handling auth flow between different auth forms. */
const LoginIsland = ({redirect_url}: {redirect_url: string}) => {
    const { getSession } = useSession();
    const [form, setForm] = useState<FormState>('login');
    const [payload, setPayload] = useState<Payload>({});
    
    useEffect(() => {
        getSession()
        .then(session => {
            setForm('logout')
        })
        .catch(e => e === 'INVALID_SESSION' ? setForm('login') : null);
    }, [])

    if (form === 'login')
        return (<LoginForm setForm={setForm} setPayload={setPayload} redirect_url={redirect_url} />)
    if (form === 'newPass')
        return (<NewPassForm setForm={setForm} setPayload={setPayload} payload={payload} redirect_url={redirect_url} />)
    if (form === 'logout')
        return (<LogoutForm setForm={setForm} setPayload={setPayload} redirect_url={redirect_url} />)
    if (form === '')
        return null
    return null
}

export default LoginIsland