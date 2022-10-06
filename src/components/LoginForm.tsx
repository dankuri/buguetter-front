import { FormEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiLogin } from '../auth';
import { useAuthContext } from './AuthProvider';
import Input from './Input';

export default function LoginForm() {
    const navigate = useNavigate();
    const { setLoggedIn } = useAuthContext();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const sendLogin: FormEventHandler<HTMLFormElement> = ev => {
        ev.preventDefault();
        if (login === '') {
            console.error('empty login!');
        } else if (password === '') {
            console.error('empty password!');
        } else {
            apiLogin({ login: login, password: password }).then(() => {
                setLoggedIn(true);
                navigate('/');
            });
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <form id="auth-form" action="#" onSubmit={sendLogin}>
                <Input placeholder="login" value={login} onChange={setLogin} />
                <Input
                    placeholder="password"
                    value={password}
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
    );
}
