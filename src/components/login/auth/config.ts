import { CognitoUserPool } from "amazon-cognito-identity-js";

// Session constants
export const USER_POOL_ID = "us-east-1_nGGi2AxpV";
export const CLIENT_ID = "2osuhaivdprtpj6j3v4sjfti1r";
export const COGNITO_REGION = "us-east-1";
export const COGNITO_POOL_URL = 'hamx.auth.us-east-1.amazoncognito.com';
export const DOMAIN_URL = 'main.d3a2hjahy8dg4j.amplifyapp.com'
export const COOKIE_DURATION = 0.04;
export const REFRESH_DURATION = 0.5;
export const COOKIE_PREFIX = "hamx-token-data-store";

export const poolData = {
    UserPoolId: USER_POOL_ID,
    ClientId: CLIENT_ID,
}

// UserPool object
export var UserPool = new CognitoUserPool(poolData);
