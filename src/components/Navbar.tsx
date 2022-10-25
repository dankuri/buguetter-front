import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import LogoutBtn from './LogoutBtn'

type Props = {
    isLoggedIn: boolean
    userName: string
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    refetch: () => void
}

function Navbar({ isLoggedIn, userName, setLoggedIn, refetch }: Props) {
    return (
        <div className="sticky top-0 flex w-screen items-center justify-between bg-slate-700 py-2 px-6">
            <Link to={'/'}>
                <h1 className="inline-block cursor-default text-left font-bold text-green-500 hover:text-green-400 hover:drop-shadow-[0_0_20px_rgba(34,197,94,1)]">
                    buguetter
                </h1>
            </Link>
            {isLoggedIn && (
                <div className="flex items-center justify-between">
                    <Avatar name={userName} size={64} />
                    <div className="spacer m-2"></div>
                    <LogoutBtn setLoggedIn={setLoggedIn} refetch={refetch} />
                </div>
            )}
        </div>
    )
}

export default Navbar
