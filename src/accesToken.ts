'use strict';

let accessToken = '';

export const setAccessToken = (inputToken: string) => {
    accessToken = inputToken;
};

export const refreshAccessToken = async () => {
    const res = await fetch(`/api/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    try {
        const data = await res.json();
        setAccessToken(data['access_token']);
    } catch (error) {
        console.error(error);
    }
};

export const getAccessToken = () => {
    return accessToken;
};
