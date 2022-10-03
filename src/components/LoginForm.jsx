import { setAccessToken } from '../accesToken';

export default function LoginForm() {
    let api_url = import.meta.env.VITE_API_URL;
    let data = {};

    async function send_data() {
        await fetch(`${api_url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((data) => {
                console.log(data);
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
            data.pass = password;
            send_data();
        }
    }

    return (
        <form action="#" onSubmit={check_data}>
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
                <a href="/register" className="btn">
                    register
                </a>
                <button type="submit" className="btn">
                    login
                </button>
            </div>
        </form>
    );
}
