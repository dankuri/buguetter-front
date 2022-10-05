import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { getAccessToken, refreshAccessToken } from '../accesToken.js';
import { useAuthContext } from './AuthProvider.jsx';

import ErrorScreen from './ErrorScreen.jsx';
import LoadingScreen from './LoadingScreen.jsx';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import Navbar from './Navbar';

export default function App() {
    const [isLoading, setLoading] = useState(true);
    const [isFailed, setFailed] = useState(false);
    const [userName, setUserName] = useState('');
    const { isLoggedIn } = useAuthContext();

    const navigate = useNavigate();

    async function getUser(token) {
        await fetch(`/api/get_user_data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setUserName(data['name']))
            .catch((error) => console.log(error));
    }

    function checkServer() {
        fetch(`/api/status`)
            .then(() => {
                setFailed(false);
            })
            .catch((error) => {
                console.error(error);
                setFailed(true);
            });
    }

    useEffect(() => {
        checkServer();
        if (!isFailed) {
            if (!isLoggedIn) {
                refreshAccessToken()
                    .then(getUser(getAccessToken()))
                    .catch(navigate('/login'));
                setLoading(false);
            }
            getUser(getAccessToken()).then(setLoading(false));
        } else {
            console.log('smth wrong bruh');
        }
    }, [isLoggedIn]);

    return (
        <>
            {!isLoading ? (
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <h2 className="h-screen flex text-3xl  items-center justify-center">
                                    hello, {userName}
                                </h2>
                            }
                        />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                    </Routes>
                    {/* {!userName ? (
                        <Auth />
                    ) : (
                        <h2 className="h-screen flex text-3xl  items-center justify-center">
                            hello, {userName}
                        </h2>
                    )} */}
                </div>
            ) : !isFailed ? (
                <LoadingScreen />
            ) : (
                <ErrorScreen />
            )}
        </>
    );
}
