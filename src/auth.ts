import { catchNull } from './catchNull';
import { apiFetchCookie, apiFetchData } from './apiFetch';

const apiLogin = (loginData: { login: string; password: string }) => {
    return apiFetchData('/api/login', 'POST', loginData);
};

const apiLogout = () => {
    return apiFetchCookie('/api/logout', 'DELETE');
};

const apiRegister = (registerData: {
    name: string;
    login: string;
    password: string;
}) => {
    return apiFetchData('/api/register', 'POST', registerData);
};

export const apiLoginCatching = catchNull(apiLogin);
export const apiLogoutCatching = catchNull(apiLogout);
export const apiRegisterCatching = catchNull(apiRegister);
