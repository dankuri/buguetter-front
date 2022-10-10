import { statusErrorHandler } from './errors';

export const apiFetchCookie = async (url: string, method: string) => {
    const res = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    const { msg, error }: ApiResponse = await res.json();
    return statusErrorHandler({ msg, error });
};

export const apiFetchData = async (
    url: string,
    method: string,
    data: { [key: string]: string }
) => {
    const res = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });
    const { msg, error }: ApiResponse = await res.json();
    return statusErrorHandler({ msg, error });
};
