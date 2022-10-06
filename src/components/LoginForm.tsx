import { FormEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiLoginCatching } from '../auth';
import Input from './Input';

type Props = {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginForm({ setLoggedIn }: Props) {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const sendLogin: FormEventHandler<HTMLFormElement> = async ev => {
        ev.preventDefault();
        if (login === '') setError('empty login!');
        else if (password === '') setError('empty password!');
        else {
            const response = await apiLoginCatching({ login, password });
            if (response == 'success') {
                setLoggedIn(true);
                navigate('/');
            } else if (typeof response == 'string') {
                setError(response);
            }
        }
    };

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
    );
}
