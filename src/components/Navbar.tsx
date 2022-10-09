import { Link } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';

type Props = {
    isLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

function Navbar({ isLoggedIn, setLoggedIn }: Props) {
    return (
        <>
            <Link to={'/'}>
                <h1 className="fixed top-5 left-5 text-left w-6/12 inline-block font-bold text-green-500 cursor-default hover:drop-shadow-[0_0_20px_rgba(34,197,94,1)]">
                    buguetter
                </h1>
            </Link>
            {isLoggedIn && <LogoutBtn setLoggedIn={setLoggedIn} />}
        </>
    );
}

export default Navbar;
