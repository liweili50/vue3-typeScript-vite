const TokenKey = 'token'


export function getToken():string|null {
    return localStorage.getItem(TokenKey);
}

export function setToken(token: string):void {
    return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
    return localStorage.removeItem(TokenKey);
}
