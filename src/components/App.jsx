import { useEffect, useState } from 'react';
import './App.css';
import { getAccessToken, setAccessToken } from '../accesToken.js';

function App() {
    const [token, setToken] = useState('');
    useEffect(() => {
        console.log(import.meta.env.VITE_API_URL);
        if (getAccessToken() === '') {
            setToken(prompt('no auth bruh', ''));
            if (token) {
                setAccessToken(token);
            }
        }
        console.log(getAccessToken());
    });
    return (
        <div className="App">
            <h1 className="text-left w-6/12 inline-block font-bold text-green-500 cursor-default hover:drop-shadow-[0_0_20px_rgba(34,197,94,1)]">
                buguetter
            </h1>
            {getAccessToken() != '' && (
                <div className="font-bold text-right text-5xl inline-block w-6/12">
                    logged in
                </div>
            )}
        </div>
    );
}

export default App;
