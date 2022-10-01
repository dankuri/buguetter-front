import { useEffect } from 'react';
import { useState } from 'react';
import { getAccessToken } from '../accesToken';

function Auth() {
    // if (getAccessToken() === '') {
    //     let token = '';
    //     token = prompt('no auth bruh', '');
    //     if (token) {
    //         setAccessToken(token);
    //     }
    // }
    const api_url = import.meta.env.VITE_API_URL;
    const send_data = (ev) => {
        ev.preventDefault();
        let login = document.querySelector('#login').value;
        let password = document.querySelector('#pass').value;
        console.log(
            `login: ${login}\npassword: ${password}\nsent to ${api_url}`
        );
    };

    const [isLoading, setLoading] = useState(true);

    const checkServer = () => {
        console.log('checking server');
        fetch(`${api_url}/status`).then((response) => {
            console.log(response['status']);
            setLoading(false);
        });
    };

    useEffect(checkServer, []);

    return (
        <>
            {isLoading === false ? (
                <div
                    id="auth-form"
                    className="h-screen flex flex-col justify-center items-center"
                >
                    <form action="#" onSubmit={send_data}>
                        <input
                            type="login"
                            className="block m-4 p-2 text-2xl rounded-lg"
                            id="login"
                            placeholder="login"
                        />
                        <input
                            type="password"
                            className="block m-4 p-2 text-2xl rounded-lg"
                            name="pass"
                            id="pass"
                            placeholder="password"
                        />
                        <button
                            type="submit"
                            style={{ backgroundColor: '#1a1a1a' }}
                        >
                            login
                        </button>
                    </form>
                </div>
            ) : (
                <div className="h-screen flex flex-col items-center justify-center text-2xl">
                    i'm loading bruh
                </div>
            )}
        </>
    );
}

export default Auth;
