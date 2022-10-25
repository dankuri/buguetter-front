import { FormEventHandler, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { RegisterDocument } from '../graphql/gql'
import Input from './Input'

type Props = {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    refetch: () => void
}

export default function RegisterForm({ setLoggedIn, refetch }: Props) {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [registerMutation, { error: mutError, reset }] =
        useMutation(RegisterDocument)

    const sendRegister: FormEventHandler<HTMLFormElement> = async ev => {
        ev.preventDefault()
        setError('')
        reset()
        if (name === '') setError('empty name!')
        else if (login === '') setError('empty login!')
        else if (password === '') setError('empty password!')
        else {
            await registerMutation({
                variables: {
                    name,
                    login,
                    password
                }
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
            <form action="#" onSubmit={sendRegister}>
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

                <div className="flex flex-row justify-around">
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
