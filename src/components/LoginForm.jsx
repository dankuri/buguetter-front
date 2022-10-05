import { Link, useNavigate } from 'react-router-dom';
import { api_login } from '../auth';
import { useAuthContext } from './AuthProvider';
export default function LoginForm() {
    const navigate = useNavigate();
    const { setLoggedIn } = useAuthContext();
    function send_login(ev) {
        ev.preventDefault();
        let login = document.querySelector('#login').value;
        let password = document.querySelector('#pass').value;
        if (login === '') {
            console.error('empty login!');
        } else if (password === '') {
            console.error('empty password!');
        } else {
            api_login({ login: login, password: password }).then(() => {
                setLoggedIn(true);
                navigate('/');
            });
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <form id="auth-form" action="#" onSubmit={send_login}>
                <input
                    type="login"
                    className="block m-4 p-2 text-2xl rounded-lg bg-slate-700"
                    id="login"
                    placeholder="login"
                />
                <input
                    type="password"
                    className="block m-4 p-2 text-2xl rounded-lg bg-slate-700"
                    name="pass"
                    id="pass"
                    placeholder="password"
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
