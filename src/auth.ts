import { catchNull } from './catchNull';
import { statusErrorHandler } from './errors';
import { apiFetchCookie, apiFetchData } from './apiFetch';

const apiLogin = async (loginData: { login: string; password: string }) => {
    return apiFetchData('/api/login', 'POST', loginData);
};

const apiLogout = async () => {
    return apiFetchCookie('/api/logout', 'DELETE');
};

const apiRegister = async (registerData: {
    name: string;
    login: string;
    password: string;
}) => {
    return apiFetchData('/api/register', 'POST', registerData);
};

export const apiLoginCatching = catchNull(apiLogin);
export const apiLogoutCatching = catchNull(apiLogout);
export const apiRegisterCatching = catchNull(apiRegister);
