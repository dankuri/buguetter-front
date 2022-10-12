import { FormEventHandler, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRegisterCatching, apiLoginCatching } from '../auth'
import { getUserCatching } from '../getUser'
import Input from './Input'

type Props = {
    setUserName: React.Dispatch<React.SetStateAction<string>>
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RegisterForm({ setUserName, setLoggedIn }: Props) {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const sendRegister: FormEventHandler<HTMLFormElement> = async ev => {
        ev.preventDefault()
        if (name === '') setError('empty name!')
        else if (login === '') setError('empty login!')
        else if (password === '') setError('empty password!')
        else {
            const registerResponse = await apiRegisterCatching({
                name,
                login,
                password
            })
            if (registerResponse === 'success') {
                const loginResponse = await apiLoginCatching({
                    login,
                    password
                })
                if (loginResponse == 'success') {
                    const data = await getUserCatching()
                    if (data.name) {
                        setUserName(data.name)
                        setLoggedIn(true)
                        navigate('/')
                    } else {
                        setError('cannot get name')
                    }
                } else {
                    setError('bad login')
                }
            } else if (typeof registerResponse == 'string') {
                setError(registerResponse)
            }
        }
    }

    return (
        <div className="flex flex-col grow justify-center items-center">
            {error && <h2>{error}</h2>}
            <form id="auth-form" action="#" onSubmit={sendRegister}>
                <Input
                    placeholder="name"
                    value={name}
                    type="text"
                    onChange={setName}
                />
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
                    <Link to={'/login'} className="btn link">
                        login
                    </Link>
                    <button type="submit" className="btn">
                        register
                    </button>
                </div>
            </form>
        </div>
    )
}
