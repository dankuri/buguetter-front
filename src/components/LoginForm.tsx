import { FormEventHandler, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LoginDocument } from '../graphql/gql'
import Input from './Input'

type Props = {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    refetch: () => void
}

export default function LoginForm({ setLoggedIn, refetch }: Props) {
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loginMutation, { error: mutError, reset }] =
        useMutation(LoginDocument)

    const sendLogin: FormEventHandler<HTMLFormElement> = async ev => {
        ev.preventDefault()
        setError('')
        reset()
        if (login === '') setError('empty login!')
        else if (password === '') setError('empty password!')
        else {
            await loginMutation({
                variables: { login, password }
            }).then(() => {
                refetch()
                setLoggedIn(true)
                navigate('/')
            })
        }
    }

    return (
        <div className="flex grow flex-col items-center justify-center">
            {error ? <h2>{error}</h2> : null}
            {mutError ? <h2>{mutError.message}</h2> : null}
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
