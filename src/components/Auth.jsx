import LoginForm from './LoginForm';

export default function Auth() {
    return (
        <div
            id="auth-form"
            className="h-screen flex flex-col justify-center items-center"
        >
            <LoginForm />
        </div>
    );
}
