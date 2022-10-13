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
    // FIXME: fires 2 times instead 1 on prod (3 on dev even)
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
        <div className="App flex min-h-screen flex-col">
            {!isLoading ? (
                <>
                    <Navbar
                        userName={userName}
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
                                        <h2 className="flex grow flex-col items-center justify-center text-3xl">
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
                </>
            ) : !isFailed ? (
                <LoadingScreen />
            ) : (
                <ErrorScreen />
            )}
        </div>
    )
}
