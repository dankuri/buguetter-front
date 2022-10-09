import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';

import useServerCheck from '../hooks/useServerCheck.js';
import { refreshUser } from '../refreshUser.js';

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

    const asyncEffect = async () => {
        if (!isFailed) {
            const name = await refreshUser();
            if (name) {
                setUserName(name);
                setLoggedIn(true);
            } else {
                navigate('/login');
            }
            setLoading(false);
        }
    };

    useEffect(() => void asyncEffect(), [isLoggedIn, isFailed]);

    return (
        <>
            {!isLoading ? (
                <div className="App">
                    <Navbar
                        setUserName={setUserName}
                        isLoggedIn={isLoggedIn}
                        setLoggedIn={setLoggedIn}
                    />
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
                            element={
                                <LoginForm
                                    setUserName={setUserName}
                                    setLoggedIn={setLoggedIn}
                                />
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <RegisterForm
                                    setUserName={setUserName}
                                    setLoggedIn={setLoggedIn}
                                />
                            }
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
