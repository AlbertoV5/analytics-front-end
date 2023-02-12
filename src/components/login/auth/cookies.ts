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
  name: string;
  group: string;
  licenseEnd: string;
}

const emptyUser: User = {
  exp: '',
  username: '',
  name: '',
  group: '',
  licenseEnd: '',
}

export function setTokensCookies(tokens: Tokens){
  Cookies.set(`${COOKIE_PREFIX}-token`, tokens.token, {expires: COOKIE_DURATION});
  Cookies.set(`${COOKIE_PREFIX}-refresh`, tokens.refresh, {expires: REFRESH_DURATION});
}

export function setUserCookies(user: User) {
  Object.entries(user).forEach(([key, value]) => {
    Cookies.set(`${COOKIE_PREFIX}-${key}`, value, {expires: COOKIE_DURATION});
  })
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
  const name = Cookies.get(`${COOKIE_PREFIX}-name`);
  const group = Cookies.get(`${COOKIE_PREFIX}-group`);
  const licenseEnd = Cookies.get(`${COOKIE_PREFIX}-licenseEnd`);
  return (
      (exp && username && name && group && licenseEnd) ? 
      {exp: exp, username: username, name: name, group: group, licenseEnd: licenseEnd}
      : undefined
  )
}