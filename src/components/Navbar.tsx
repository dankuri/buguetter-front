import { Link } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'

type Props = {
    isLoggedIn: boolean
    userName: string
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    setUserName: React.Dispatch<React.SetStateAction<string>>
}

function Navbar({ isLoggedIn, userName, setLoggedIn, setUserName }: Props) {
    return (
        <div className="sticky flex top-0 w-screen border-b-2 py-2 px-6 bg-slate-700 justify-between items-center">
            <Link to={'/'}>
                <h1 className="text-left inline-block font-bold text-green-500 cursor-default hover:drop-shadow-[0_0_20px_rgba(34,197,94,1)]">
                    buguetter
                </h1>
            </Link>
            {isLoggedIn && (
                <div className="flex items-center">
                    <img
                        src={`https://joeschmoe.io/api/v1/${userName}`}
                        alt="ur profile pic"
                        className="w-16 h-16 mr-4 rounded-full bg-gray-800"
                    />
                    <LogoutBtn
                        setUserName={setUserName}
                        setLoggedIn={setLoggedIn}
                    />
                </div>
            )}
        </div>
    )
}

export default Navbar
