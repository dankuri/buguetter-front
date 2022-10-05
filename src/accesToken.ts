'use strict';

let accessToken = '';

export const setAccessToken = (inputToken) => {
    accessToken = inputToken;
};

export const refreshAccessToken = async () => {
    await fetch(`/api/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
        .then((response) => response.json())
        .then((data) => {
            setAccessToken(data['access_token']);
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getAccessToken = () => {
    return accessToken;
};
