import { useEffect, useState } from 'react';
import { getAccessToken } from '../accesToken.js';
import './App.css';
import Auth from './Auth';
import Navbar from './Navbar';
export default function App() {
    const api_url = import.meta.env.VITE_API_URL;

    const [isLoading, setLoading] = useState(true);
    const [isFailed, setFailed] = useState(false);
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

    async function checkServer() {
        console.log('checking server');
        isCheckingServer = true;
        await fetch(`${api_url}/status`)
            .then((response) => {
                if (response.ok) {
                    setLoading(false);
                    setFailed(false);
                    clearTimeout(recheck);
                    isCheckingServer = false;
                    console.log('server ok');
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
    }, []);

    return (
        <>
            {isLoading === false ? (
                <div className="App">
                    <Navbar />
                    <Auth />
                </div>
            ) : isFailed === false ? (
                <LoadingScreen />
            ) : (
                <ErrorScreen />
            )}
        </>
    );
}
