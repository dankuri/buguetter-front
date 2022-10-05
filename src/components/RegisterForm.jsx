import { Link } from "react-router-dom";
import { api_register } from "../auth";

export default function RegisterForm() {
    function check_data(ev) {
        ev.preventDefault();
        let name = document.querySelector('#name').value
        let login = document.querySelector('#login').value;
        let password = document.querySelector('#pass').value;
        if (name === '') console.error('empty name');
        else if (login === '') console.error('empty login!');
        else if (password === '') console.error('empty password!');
        else {
            api_register({name: name, login: login, password: password});
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <form id="auth-form" action="#" onSubmit={check_data}>
                <input
                    type="name"
                    className="block m-4 p-2 text-2xl rounded-lg"
                    id="name"
                    placeholder="name"
                />
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
};
