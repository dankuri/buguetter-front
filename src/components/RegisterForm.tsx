import { FormEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRegister, apiLogin } from '../auth';
import Input from './Input';

type Props = {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RegisterForm({ setLoggedIn }: Props) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const sendRegister: FormEventHandler<HTMLFormElement> = ev => {
        ev.preventDefault();
        if (name === '') console.error('empty name');
        else if (login === '') console.error('empty login!');
        else if (password === '') console.error('empty password!');
        else {
            apiRegister({ name, login, password }).then(() => {
                apiLogin({
                    login,
                    password
                }).then(() => {
                    setLoggedIn(true);
                    navigate('/');
                });
            });
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center">
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
    );
}
