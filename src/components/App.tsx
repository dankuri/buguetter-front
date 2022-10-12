import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'

import useServerCheck from '../hooks/useServerCheck.jsx'
import { getUserCatching } from '../getUser.js'

import ErrorScreen from './ErrorScreen.jsx'
import LoadingScreen from './LoadingScreen.jsx'
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'
import Navbar from './Navbar.jsx'
import Profile from './Profile.jsx'

export default function App() {
    const [isLoading, setLoading] = useState(true)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [userName, setUserName] = useState('')
    const isFailed = useServerCheck()
    const navigate = useNavigate()

    const asyncEffect = async () => {
        if (!isFailed) {
            const userData = await getUserCatching()
            if (userData.name) {
                setUserName(userData.name)
                setLoggedIn(true)
            } else {
                navigate('/login')
            }
            setLoading(false)
        }
    }

    useEffect(() => void asyncEffect(), [isLoggedIn, isFailed])

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
                                    <Profile current={true} name={userName} />
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
    )
}
