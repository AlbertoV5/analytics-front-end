import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { UserPool } from "./config";


export type GetUserDetailsFunction = {
    (username: string, password: string, pool: CognitoUserPool): 
    {user: CognitoUser, authDetails: AuthenticationDetails}
}
// Returns user and authDetails objects from UserPool based on username and password
export const getUserDetails = (username: string, password: string) => {
    const user = new CognitoUser({
        Username: username,
        Pool: UserPool,
    });
    const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password
    });
    return {user: user, authDetails: authDetails}
}