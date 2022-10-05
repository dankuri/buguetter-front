import { setAccessToken, getAccessToken } from '../accesToken';
import { Link, useNavigate } from 'react-router-dom';
export default function LoginForm() {
    const navigate = useNavigate()
    
    let data = {};

    async function send_data() {
        await fetch(`/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json()) 
            .then((response_data) => {
                setAccessToken(response_data['token']);
                // TODO: redirect to /, delete reload
                navigate('/')
            })
            .catch((error) => console.error(error));
    }

    function check_data(ev) {
        ev.preventDefault();
        let login = document.querySelector('#login').value;
        let password = document.querySelector('#pass').value;
        if (login === '') {
            console.error('empty login!');
        } else if (password === '') {
            console.error('empty password!');
        } else {
            data.login = login;
            data.password = password;
            send_data();
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <form id="auth-form" action="#" onSubmit={check_data}>
                <input
                    type="login"
                    className="block m-4 p-2 text-2xl rounded-lg"
                    id="login"
                    placeholder="login"
                />
                <input
                    type="password"
                    className="block m-4 p-2 text-2xl rounded-lg"
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
