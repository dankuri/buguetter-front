import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';

import { getAccessToken, refreshAccessToken } from '../accessToken.js';
import useServerCheck from '../hooks/useServerCheck.js';

import ErrorScreen from './ErrorScreen.jsx';
import LoadingScreen from './LoadingScreen.jsx';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import Navbar from './Navbar';

export default function App() {
    const [isLoading, setLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const isFailed = useServerCheck();
    const navigate = useNavigate();

    async function getUser(token: string) {
        const res = await fetch(`/api/get_user_data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        try {
            const data = await res.json();
            setUserName(data['name']);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log('App useEffect');
        if (!isFailed) {
            if (!isLoggedIn) {
                // FIXME: handle errors for refreshAccessToken
                try {
                    refreshAccessToken();
                    getUser(getAccessToken());
                } catch (error) {
                    navigate('/login');
                }
            } else {
                getUser(getAccessToken());
            }
            setLoading(false);
        } else {
            console.log('smth wrong bruh');
        }
    }, [isLoggedIn, isFailed]);

    return (
        <>
            {!isLoading ? (
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isLoggedIn ? (
                                    <h2 className="h-screen flex text-3xl items-center justify-center">
                                        hello, {userName}
                                    </h2>
                                ) : (
                                    <>
                                        <h2 className="h-screen flex flex-col text-3xl items-center justify-center">
                                            ur not logged in, go to
                                            <Link
                                                to={'/login'}
                                                className={'btn'}
                                            >
                                                login
                                            </Link>
                                        </h2>
                                    </>
                                )
                            }
                        />
                        <Route
                            path="/login"
                            element={<LoginForm setLoggedIn={setLoggedIn} />}
                        />
                        <Route
                            path="/register"
                            element={<RegisterForm setLoggedIn={setLoggedIn} />}
                        />
                    </Routes>
                </div>
            ) : !isFailed ? (
                <LoadingScreen />
            ) : (
                <ErrorScreen />
            )}
        </>
    );
}
