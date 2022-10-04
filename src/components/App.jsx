import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { getAccessToken, refreshAccessToken } from '../accesToken.js';
import './App.css';

import ErrorScreen from './ErrorScreen.jsx';
import LoadingScreen from './LoadingScreen.jsx'; 
import Auth from './Auth';
import Navbar from './Navbar';

export default function App() {
    const api_url = import.meta.env.VITE_API_URL;

    const [isLoading, setLoading] = useState(true);
    const [isFailed, setFailed] = useState(false);
    const [userName, setUserName] = useState('');

    let isCheckingServer = false;

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

    function recheck() {
            if (!isCheckingServer) setTimeout(checkServer, 5000);
    }
    
    async function checkServer() {
        isCheckingServer = true;
        await fetch(`${api_url}/status`)
            .then((response) => {
                if (response.ok) {
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
        refreshAccessToken().then(() => {
            getUser(getAccessToken()).then(() => {
                setLoading(false);
            });
        }).catch((error) => console.error(error))
    }, []);

    return (
        <>
            {!isLoading ? (
                <div className="App">
                    <Navbar />
                    {!userName ? <Auth /> : 
                        <h2 className='h-screen flex text-3xl  items-center justify-center'>hello, {userName}</h2>
                    }
                </div>
            ) : !isFailed ? (
                <LoadingScreen />
            ) : (
                <ErrorScreen />
            )}
        </>
    );
}
