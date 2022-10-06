import { FormEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRegister, apiLogin } from '../auth';
import { useAuthContext } from './AuthProvider';
import Input from './Input';

export default function RegisterForm() {
    const navigate = useNavigate();
    const { setLoggedIn } = useAuthContext();
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
                <Input placeholder="name" value={name} onChange={setName} />
                <Input placeholder="login" value={login} onChange={setLogin} />
                <Input
                    placeholder="password"
                    value={password}
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
