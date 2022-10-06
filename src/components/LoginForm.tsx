import { FormEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiLogin } from '../auth';
import Input from './Input';

type Props = {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginForm({ setLoggedIn }: Props) {
    const navigate = useNavigate();
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
