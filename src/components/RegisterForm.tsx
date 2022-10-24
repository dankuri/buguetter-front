import { FormEventHandler, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { RegisterDocument } from '../graphql/gql'
import Input from './Input'

type Props = {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RegisterForm({ setLoggedIn }: Props) {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [registerMutation] = useMutation(RegisterDocument)

    const sendRegister: FormEventHandler<HTMLFormElement> = async ev => {
        ev.preventDefault()
        if (name === '') setError('empty name!')
        else if (login === '') setError('empty login!')
        else if (password === '') setError('empty password!')
        else {
            const res = await registerMutation({
                variables: {
                    name,
                    login,
                    password
                }
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
