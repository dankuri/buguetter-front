'use strict';

let accessToken = '';

export const setAccessToken = (inputToken: string) => {
    accessToken = inputToken;
};

export const getAccessToken = () => {
    return accessToken;
};
