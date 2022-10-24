import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LogoutDocument } from '../graphql/gql'

type Props = {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LogoutBtn({ setLoggedIn }: Props) {
    const [logoutMutation, { error }] = useMutation(LogoutDocument)
    const navigate = useNavigate()

    const logout = async () => {
        const res = await logoutMutation()
        if (res.data?.logout.error == 0) {
            setLoggedIn(false)
            navigate('/')
        }
    }

    return (
        <div className="mr-6">
            {error && <h2 className="">{error.message}</h2>}
            <button className="btn " onClick={logout}>
                logout
            </button>
        </div>
    )
}
