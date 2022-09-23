'use strict';

let accessToken = '';

export const setAccessToken = (inputToken) => {
    accessToken = inputToken;
};

export const getAccessToken = () => {
    return accessToken;
};
