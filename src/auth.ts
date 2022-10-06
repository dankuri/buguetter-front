import { setAccessToken } from './accessToken';
import { catchNull } from './catchNull';

const apiLogin = async (loginData: { login: string; password: string }) => {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });
    const data = await res.json();
    // TODO: create response codes to not check every response like dis
    if (data['token']) {
        setAccessToken(data['token']);
        return 'success';
    } else if (data['response'] === 'wrong password') return 'wrong password!';
    else if (data['response'] === 'none user') return 'no such user!';
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
    const data = await res.json();
    if (data['response'] === true) return 'success';
    else return data['response'];
};

export const apiLoginCatching = catchNull(apiLogin);
export const apiRegisterCatching = catchNull(apiRegister);
