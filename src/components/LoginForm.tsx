import { FormEventHandler, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiLoginCatching } from '../auth'
import { getUserCatching } from '../getUser'
import Input from './Input'

type Props = {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    setUserName: React.Dispatch<React.SetStateAction<string>>
}

export default function LoginForm({ setLoggedIn, setUserName }: Props) {
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const sendLogin: FormEventHandler<HTMLFormElement> = async ev => {
        ev.preventDefault()
        if (login === '') setError('empty login!')
        else if (password === '') setError('empty password!')
        else {
            const response = await apiLoginCatching({ login, password })
            if (response == 'success') {
                const data = await getUserCatching()
                if (data.name) {
                    setUserName(data.name)
                    setLoggedIn(true)
                    navigate('/')
                } else {
                    setError('cannot get name')
                }
            } else if (typeof response == 'string') {
                setError(response)
            }
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            {error && <h2>{error}</h2>}
            <form id="auth-form" action="#" onSubmit={sendLogin}>
                <Input
                    placeholder="login"
                    value={login}
                    type="text"
                    onChange={setLogin}
                />
                <Input
                    placeholder="password"
                    value={password}
                    type="password"
                    onChange={setPassword}
                />
                <div id="auth_btns" className="flex flex-row justify-around">
                    <Link to={'/register'} className="btn link">
                        register
                    </Link>
                    <button type="submit" className="btn">
                        login
                    </button>
                </div>
            </form>
        </div>
    )
}
