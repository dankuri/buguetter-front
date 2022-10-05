import { getAccessToken, setAccessToken } from "./accesToken"

export const api_login = async (login_data) => {
    await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(login_data),
    })
        .then((response) => response.json())
        .then((response_json) => {
            setAccessToken(response_json['token']);
            console.log(getAccessToken())
        })
        .catch((error) => {
            console.error(error);
        });
}

export const api_register = async (register_data) => {
    await fetch(`/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(register_data),
    })
        .then((response) => response.json())
        .then((response_json) => {
            console.log(response_json)
            if (response_json['response'] == true) {
                api_login({login: register_data.login, password: register_data.password})
            } else {
                console.error(response_json['response']);
            }
        })
        .catch((error) => console.error(error));
}