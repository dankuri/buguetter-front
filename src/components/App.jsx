import { useEffect, useState } from 'react';
import { getAccessToken } from '../accesToken.js';
import refreshToken from '../refreshToken.js';
import './App.css';
import Auth from './Auth';
import Navbar from './Navbar';
export default function App() {
    const api_url = import.meta.env.VITE_API_URL;

    const [isLoading, setLoading] = useState(true);
    const [isFailed, setFailed] = useState(false);
    const [userName, setUserName] = useState('');

    let isCheckingServer = false;

    function ErrorScreen() {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-red-600 text-3xl">
                server not working!
            </div>
        );
    }

    function LoadingScreen() {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-3xl">
                i'm loading bruh
            </div>
        );
    }

    function recheck() {
        if (!isCheckingServer) setTimeout(checkServer, 5000);
    }

    async function getUser(token) {
        await fetch(`${api_url}/get_user_data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setUserName(data["name"]))
            .catch(error => console.log(error))
    }

    async function checkServer() {
        isCheckingServer = true;
        await fetch(`${api_url}/status`)
            .then((response) => {
                if (response.ok) {
                    setLoading(false);
                    setFailed(false);
                    clearTimeout(recheck);
                    isCheckingServer = false;
                }
            })
            .catch((error) => {
                console.error(error);
                setFailed(true);
                isCheckingServer = false;
                recheck();
            });
    }

    useEffect(() => {
        checkServer();
        refreshToken().then(() => {
            getUser(getAccessToken());
        })
    }, []);

    return (
        <>
            {isLoading === false ? (
                <div className="App">
                    <Navbar />
                    {!userName && <Auth />}
                    <h2 className='h-screen flex text-3xl  items-center justify-center'>hello, {userName}</h2>
                </div>
            ) : isFailed === false ? (
                <LoadingScreen />
            ) : (
                <ErrorScreen />
            )}
        </>
    );
}
