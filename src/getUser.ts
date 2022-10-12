import { catchNull } from './catchNull'

const getUser = async () => {
    const res = await fetch(`/api/get_user_data`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    const data = await res.json()
    if (!data.error) return data
    else return false
}

export const getUserCatching = catchNull(getUser)
