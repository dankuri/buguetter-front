import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { UserFullDocument } from '../graphql/gql'

import LoadingScreen from './LoadingScreen'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Navbar from './Navbar'
import Profile from './Profile'

export default function App() {
    const navigate = useNavigate()
    const [isLoggedIn, setLoggedIn] = useState(false)
    const { data, loading, error, refetch } = useQuery(UserFullDocument, {
        variables: { userId: 0 },
        fetchPolicy: 'no-cache'
    })

    useEffect(() => {
        if (data) {
            setLoggedIn(true)
            navigate('/')
        } else if (error) navigate('/login')
    }, [data, loading, isLoggedIn])

    if (loading) return <LoadingScreen />

    if (!data || error) {
        return (
            <div className="flex min-h-screen flex-col">
                <Navbar
                    userName=""
                    isLoggedIn={false}
                    setLoggedIn={setLoggedIn}
                    refetch={refetch}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <h2 className="flex grow flex-col items-center justify-center text-3xl">
                                    ur not logged in, go to
                                    <Link to={'/login'} className={'btn'}>
                                        login
                                    </Link>
                                </h2>
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <LoginForm
                                setLoggedIn={setLoggedIn}
                                refetch={refetch}
                            />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <RegisterForm
                                setLoggedIn={setLoggedIn}
                                refetch={refetch}
                            />
                        }
                    />
                </Routes>
            </div>
        )
    }

    const userData = {
        name: data.user.name,
        userId: data.user.id
    }

    return (
        <main className="flex min-h-screen flex-col">
            {!loading ? (
                <>
                    <Navbar
                        userName={userData.name}
                        isLoggedIn={isLoggedIn}
                        setLoggedIn={setLoggedIn}
                        refetch={refetch}
                    />
                    <Routes>
                        <Route
                            path="/"
                            element={<Profile current={true} {...userData} />}
                        />
                        <Route
                            path="/login"
                            element={
                                <LoginForm
                                    setLoggedIn={setLoggedIn}
                                    refetch={refetch}
                                />
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <RegisterForm
                                    setLoggedIn={setLoggedIn}
                                    refetch={refetch}
                                />
                            }
                        />
                    </Routes>
                </>
            ) : (
                <LoadingScreen />
            )}
        </main>
    )
}
