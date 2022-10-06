import { setAccessToken } from './accessToken';

export const apiLogin = async (loginData: {
    login: string;
    password: string;
}) => {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });
    try {
        const data = await res.json();
        setAccessToken(data['token']);
    } catch (error) {
        throw error;
    }
};

export const apiRegister = async (registerData: {
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
    try {
        const data = await res.json();
        if (data['response'] !== true) {
            throw data['response'];
        }
    } catch (error) {
        throw error;
    }
};
