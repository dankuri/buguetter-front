import { FormEventHandler, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LoginDocument } from '../graphql/gql'
import Input from './Input'

type Props = {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LoginForm({ setLoggedIn }: Props) {
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loginMutation] = useMutation(LoginDocument)

    const sendLogin: FormEventHandler<HTMLFormElement> = async ev => {
        ev.preventDefault()
        setError('')
        if (login === '') setError('empty login!')
        else if (password === '') setError('empty password!')
        else {
            const res = await loginMutation({
                variables: { login, password }
            })
            if (res.data) {
                setLoggedIn(true)
                navigate('/')
            } else if (res.errors) {
                setError(res.errors[0].message)
            }
        }
    }

    return (
        <div className="flex grow flex-col items-center justify-center">
            {error ? <h2>{error}</h2> : null}
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
