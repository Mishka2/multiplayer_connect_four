import Cookies from 'js-cookie';

export type CookieOptions = {
    expires: number,
    path: string
}

const defaultCookieOptions = {
    expires: 365,
    path: '/'
}

class CookieHelper {
    static setCookie(name: string, value: string, options: CookieOptions = defaultCookieOptions): void {
        Cookies.set(name, value, {
            ...options,
        });
    }

    static getCookie(name: string): string | undefined {
        return Cookies.get(name);
    }

    static removeCookie(name: string): void {
        Cookies.remove(name);
    }
}

export default CookieHelper;
