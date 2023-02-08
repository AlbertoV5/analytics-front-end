import { useState, useEffect } from "react";
import { useSession } from "./hooks/useSession";
import type { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";

import NewPassForm from "./NewPassForm";
import LogoutForm from "./LogoutForm";
import LoginForm from "./LoginForm";

export type FormState = 'login' | 'newPass' | 'logout' | '';
export interface UserAttributes {
    email: string;
    email_verified: string;
}
export interface Payload {
    user?: CognitoUser;
    attributes?: UserAttributes;
}
export type SetFormFunction = React.Dispatch<React.SetStateAction<FormState>>
export type SetPayloadFunction = React.Dispatch<React.SetStateAction<Payload>>
export interface LoginFormProps {
    setForm: SetFormFunction;
    setPayload: SetPayloadFunction;
    payload?: Payload;
}
export const REDIRECT_URL = "/database";

/** Parent component for Login/Logout forms. */
const LoginIsland = () => {
    const { getSession } = useSession();
    const [form, setForm] = useState<FormState>('login');
    const [payload, setPayload] = useState<Payload>({});

    useEffect(() => {
        getSession()
        .then(session => setForm('logout'))
        .catch(e => e === 'INVALID_SESSION' ? setForm('login') : null);
    }, [])

    if (form === 'login')
        return (<LoginForm setForm={setForm} setPayload={setPayload}></LoginForm>)
    if (form === 'newPass')
        return (<NewPassForm setForm={setForm} setPayload={setPayload} payload={payload}></NewPassForm>)
    if (form === 'logout')
        return (<LogoutForm setForm={setForm} setPayload={setPayload}></LogoutForm>)
    if (form === '')
        return (<></>)
    return null;
}

export default LoginIsland