import { catchNull } from './catchNull';
import { errors } from './errors';

const apiLogin = async (loginData: { login: string; password: string }) => {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });
    const { msg, error }: ApiResponse = await res.json();
    console.log(msg);
    console.log(error);
    if (msg == 'success') {
        return 'success';
    } else if (error in errors) {
        return errors[error];
    } else if (error) {
        return 'unknown error';
    } else {
        return 'invalid response';
    }
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
    if (msg == 'success') {
        return 'success';
    } else if (typeof msg == 'number' && msg in errors) {
        return errors[msg];
    } else if (typeof msg == 'number') {
        return 'unknown error';
    } else {
        return 'invalid response';
    }
};

export const apiLoginCatching = catchNull(apiLogin);
export const apiRegisterCatching = catchNull(apiRegister);
