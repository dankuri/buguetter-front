import { useEffect, useState } from 'react';
import './App.css';
import { getAccessToken } from '../accesToken.js';
import Auth from './Auth';
function App() {
    const api_url = import.meta.env.VITE_API_URL;

    const [isLoading, setLoading] = useState(true);
    const [isFailed, setFailed] = useState(false);

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

    async function checkServer() {
        console.log('checking server');
        await fetch(`${api_url}/status`)
            .then((response) => {
                if (response.ok) setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setFailed(true);
            });
    }

    useEffect(() => {
        checkServer();
    }, []);

    return (
        <>
            {isLoading === false ? (
                <div className="App">
                    <h1 className="fixed top-5 left-5 text-left w-6/12 inline-block font-bold text-green-500 cursor-default hover:drop-shadow-[0_0_20px_rgba(34,197,94,1)]">
                        buguetter
                    </h1>
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

export default App;
