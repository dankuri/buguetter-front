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
    const data = await res.json()
    console.log(data)
    if (!data.error) return data
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
    } else return false
}

export const getUserCatching = catchNull(getUser)
