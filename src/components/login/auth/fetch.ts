import { COGNITO_POOL_URL, CLIENT_ID } from "./config";


export async function fetchTokenRefresh(refresh: string) {
    return await fetch(`https://${COGNITO_POOL_URL}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=refresh_token&refresh_token=${refresh}&client_id=${CLIENT_ID}`
    });
}