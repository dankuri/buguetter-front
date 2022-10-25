import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LogoutDocument } from '../graphql/gql'

type Props = {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    refetch: () => void
}

export default function LogoutBtn({ setLoggedIn, refetch }: Props) {
    const [logoutMutation, { error }] = useMutation(LogoutDocument)
    const navigate = useNavigate()

    const logout = async () => {
        await logoutMutation().then(() => {
            refetch()
            setLoggedIn(false)
            navigate('/')
        })
    }

    return (
        <div className="mr-6 flex flex-col items-center">
            {error && <h2 className="text-center">{error.message}</h2>}
            <button className="btn " onClick={logout}>
                logout
            </button>
        </div>
    )
}
