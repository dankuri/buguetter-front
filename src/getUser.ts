import { catchNull } from './catchNull'

const getUser = async () => {
    console.log('start get user')
    const res = await fetch(`/api/get_user_data`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    console.log(res)
    const data = await res.json()
    console.log(data)
    // TODO: extract this kind of fetch in apiFetch
    if (data.msg == 'new_token') {
        console.log('refreshed token')
        const newRes = await fetch(`/api/get_user_data`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        const newData = await newRes.json()
        return newData
    } else if (!data.error) return data
    else return false
}

export const getUserCatching = catchNull(getUser)
