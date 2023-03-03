import Cookies from "js-cookie";


export function isLogged():boolean {
    let token = Cookies.get('token');

    return (token) ? true : false;
}

export function doLogin(token: string, rememberPassword: boolean) {
    if(rememberPassword) {
        Cookies.set('token', token, {expires: 999})
    } else {
        Cookies.set('token', token)
    }
}

export function doLogout() {
    Cookies.remove('token');
}