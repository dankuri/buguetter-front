import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { apiLogoutCatching } from '../auth';
import { errors } from '../errors';

type Props = {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LogoutBtn({ setLoggedIn }: Props) {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const logout = async () => {
        const response = await apiLogoutCatching();
        if (response == 'success') setLoggedIn(false);
        else if (
            response == errors[8] ||
            response == errors[9] ||
            response == errors[10]
        ) {
            navigate('/login');
        } else if (typeof response == 'string') setError(response);
    };

    return (
        <div className="fixed right-5 top-5 text-right">
            {error && <h2 className="">{error}</h2>}
            <button className="btn " onClick={logout}>
                logout
            </button>
        </div>
    );
}
