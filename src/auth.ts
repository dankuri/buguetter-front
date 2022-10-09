import { catchNull } from './catchNull';
import { errors, statusErrorHandler } from './errors';

const apiLogin = async (loginData: { login: string; password: string }) => {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });
    const { msg, error }: ApiResponse = await res.json();
    return statusErrorHandler({ msg, error });
};

const apiLogout = async () => {
    const res = await fetch('/api/logout', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    const { msg, error }: ApiResponse = await res.json();
    return statusErrorHandler({ msg, error });
};

const apiRegister = async (registerData: {
    name: string;
    login: string;
    password: string;
}) => {
    const res = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    });
    const { msg, error }: ApiResponse = await res.json();
    return statusErrorHandler({ msg, error });
};

export const apiLoginCatching = catchNull(apiLogin);
export const apiLogoutCatching = catchNull(apiLogout);
export const apiRegisterCatching = catchNull(apiRegister);
