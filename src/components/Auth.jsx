import { getAccessToken } from '../accesToken';

function Auth() {
    const api_url = import.meta.env.VITE_API_URL;

    const send_data = (ev) => {
        ev.preventDefault();
        let login = document.querySelector('#login').value;
        let password = document.querySelector('#pass').value;
        if (login === '') {
            console.error('empty login!');
        } else if (password === '') {
            console.error('empty password!');
        } else {
            console.log(
                `login: ${login}\npassword: ${password}\nsent to ${api_url}`
            );
        }
    };

    return (
        <div
            id="auth-form"
            className="h-screen flex flex-col justify-center items-center"
        >
            <form action="#" onSubmit={send_data}>
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
                <a href="/register" className="bg-">
                    register
                </a>
                <button type="submit" className="bg-slate-800">
                    login
                </button>
            </form>
        </div>
    );
}

export default Auth;
