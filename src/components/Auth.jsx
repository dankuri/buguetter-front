import LoginForm from './LoginForm';
import { useState, useEffect } from 'react';

export default function Auth() {

    const [hasRefresh, setHasRefresh] = useState(false)

    useEffect(() => {
        setHasRefresh(document.cookie
        .split('; ')
        .some((item) => item.startsWith('refresh_token=')))
    }, [])

    return (
        <div
            id="auth-form"
            className="h-screen flex flex-col justify-center items-center"
        >
            { !hasRefresh && <LoginForm />}
        </div>
    );
}
