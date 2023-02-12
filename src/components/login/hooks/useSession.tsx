// Store jwt in cookies for using same session for fetches, 
// AWS cognito manages sessions server-side.
import { getTokenCookie, getRefreshCookie, setTokensCookies,  getUserCookies, setUserCookies } from "../auth/cookies";
import type { Tokens, User } from "../auth/cookies";
import { fetchTokenRefresh } from "../auth/fetch";
import jwt_decode from "jwt-decode";


export interface DecodedToken {
    exp: number;
    'cognito:username': string;
    'name': string;
    'cognito:groups'?: string[];
    'custom:licenseEnd': string;
}
export interface UserSession {
    user: User;
    token: string;
}
export interface TokenResponse {
    id_token: string;
}
export interface SessionCallbacks {
    /** Replace current session with new tokens. This will decode the JWT id token to get
     * the user data. Use this on user login.
     */
    setSession: (tokens: Tokens | undefined) => void;
    /** Validate and return user session. Attempt to refresh if expired. Otherwise error. 
        1. Load the user data and verify its expiration date.
        2. If it hasn't expired, load the token, and return the session.
        3. If it expired, load the refresh and make an API call to the token endpoint.
        4. If the API call is ok, then set and return the session with the new tokens.
    */
    getSession: () => Promise<UserSession>;
}

/** Decode JWT and get user data*/
export const parseToken = (token: string): User => {
    const decoded = (jwt_decode(token) as DecodedToken);
    const groups =  decoded['cognito:groups'];
    return {
        exp: decoded.exp.toString(),
        username: decoded['cognito:username'],
        name: decoded['name'],
        group: groups ? groups[groups.length - 1] : '', // get last group (lowest precedence)
        licenseEnd: decoded['custom:licenseEnd'],
    }
}

/** Set Cookie using token and config variables. Set empty if undefined / logout. */
const setSession = (tokens: Tokens | undefined): UserSession => {
    if (tokens === undefined){
        const tokens = {token: '', refresh: ''};
        const user = {username: '', name: '', exp: '', group: '', licenseEnd: ''};
        setTokensCookies(tokens);
        setUserCookies(user);
        return {user: user, token: ''};
    }
    const user = parseToken(tokens.token);
    setTokensCookies(tokens);
    setUserCookies(user);
    return {user: user, token: tokens.token}
}

/** API call to auth provider using refresh token. Returns both if successful. */
const refreshToken = (): Promise<Tokens> => new Promise(async (resolve, reject) => {
    const refresh = getRefreshCookie();
    if (!refresh) return reject("INVALID_SESSION");
    const response = await fetchTokenRefresh(refresh);
    if (response.ok){
        const data = (await response.json()) as TokenResponse;
        return resolve({token: data.id_token, refresh: refresh})
    }
    return reject(response.status);
})

/** TODO: Replace expired verification with server validation via provider. */
const getSession = (): Promise<UserSession> => new Promise(async (resolve, reject) => {
    const user = getUserCookies();
    if (user && Number.parseInt(user.exp) > Math.floor(Date.now() / 1000)){
        const token = getTokenCookie();
        return token ? resolve({user: user, token: token}) : reject('INVALID_SESSION')
    }
    return refreshToken()
        .then(tokens => resolve(setSession(tokens)))
        .catch(e => reject('INVALID_SESSION'))
})

/** Get callbacks for retrieving credentials, storing them, and validate them.*/
export const useSession = (): SessionCallbacks => {
    return { setSession: setSession, getSession: getSession }
}