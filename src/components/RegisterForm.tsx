import { Link, useNavigate } from 'react-router-dom';
import { api_register, api_login } from '../auth';
import { useAuthContext } from './AuthProvider';

export default function RegisterForm() {
    const { setLoggedIn } = useAuthContext();
    const navigate = useNavigate();

    function check_data(ev) {
        ev.preventDefault();
        let name = document.querySelector('#name').value;
        let login = document.querySelector('#login').value;
        let password = document.querySelector('#pass').value;
        if (name === '') console.error('empty name');
        else if (login === '') console.error('empty login!');
        else if (password === '') console.error('empty password!');
        else {
            api_register({ name: name, login: login, password: password }).then(
                () => {
                    api_login({
                        login: login,
                        password: password,
                    }).then(() => {
                        setLoggedIn(true);
                        navigate('/');
                    });
                }
            );
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <form id="auth-form" action="#" onSubmit={check_data}>
                <input
                    type="name"
                    className="block m-4 p-2 text-2xl rounded-lg bg-slate-700"
                    id="name"
                    placeholder="name"
                />
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
