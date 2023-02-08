// Utilities for storing and reading cookies
import { COOKIE_PREFIX, COOKIE_DURATION, REFRESH_DURATION } from "./config";
import Cookies from 'js-cookie'


export interface Tokens {
  token: string;
  refresh: string;
}
export interface User {
  exp: string;
  username: string;
  client: string;
}

export function setTokensCookies(tokens: Tokens){
  Cookies.set(`${COOKIE_PREFIX}-token`, tokens.token, {expires: COOKIE_DURATION});
  Cookies.set(`${COOKIE_PREFIX}-refresh`, tokens.refresh, {expires: REFRESH_DURATION});
}

export function setUserCookies(user: User) {
  Cookies.set(`${COOKIE_PREFIX}-exp`, user.exp, {expires: COOKIE_DURATION});
  Cookies.set(`${COOKIE_PREFIX}-username`, user.username, {expires: COOKIE_DURATION});
  Cookies.set(`${COOKIE_PREFIX}-client`, user.client, {expires: COOKIE_DURATION});
}

export function getRefreshCookie(): string | undefined {
  return Cookies.get(`${COOKIE_PREFIX}-refresh`);
}

export function getTokenCookie(): string | undefined {
  return Cookies.get(`${COOKIE_PREFIX}-token`);
}

export function getUserCookies(): User | undefined {
  const exp = Cookies.get(`${COOKIE_PREFIX}-exp`);
  const username = Cookies.get(`${COOKIE_PREFIX}-username`);
  const client = Cookies.get(`${COOKIE_PREFIX}-client`);
  return (
      (exp && username && client) ? 
      {exp: exp, username: username, client: client}
      : undefined
  )
}