import { catchNull } from './catchNull';
import { getAccessToken, setAccessToken } from './accessToken';

const getUser = async (token: string) => {
    const res = await fetch(`/api/get_user_data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    if (data.name) return data.name;
    else return false;
};

const refresh = async () => {
    const res = await fetch(`/api/refresh`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    const data = await res.json();
    if (data.access_token) {
        setAccessToken(data['access_token']);
        return true;
    } else return false;
};

const refreshCathing = catchNull(refresh);

export const getUserCatching = catchNull(getUser);

export const refreshUser = async () => {
    if (await refreshCathing()) {
        const name: string = await getUserCatching(getAccessToken());
        if (name !== '') {
            return name;
        }
    } else {
        return false;
    }
};
