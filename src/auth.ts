import { setAccessToken } from './accesToken';

export const apiLogin = async (login_data: {
    login: string;
    password: string;
}) => {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login_data)
    });
    try {
        const data = await res.json();
        setAccessToken(data['token']);
    } catch (error) {
        console.error(error);
    }
};

export const apiRegister = async (register_data: {
    name: string;
    login: string;
    password: string;
}) => {
    const res = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(register_data)
    });
    try {
        const data = await res.json();
        if (data['response'] !== true) {
            throw data['response'];
        }
    } catch (error) {
        console.error(error);
    }
};
