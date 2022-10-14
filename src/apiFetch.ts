import { statusErrorHandler } from './errors'
// TODO: add abortController
export const apiFetchSendCookie = async (url: string, method: string) => {
    const res = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    const { msg, error }: ApiStatusResponse = await res.json()
    // TODO: remove this log when tested
    if (msg == 'new_token') console.log('refreshed token')
    msg == 'new_token'
        ? apiFetchSendCookie(url, method)
        : statusErrorHandler({ msg, error })
    return statusErrorHandler({ msg, error })
}

export const apiFetchSendData = async (
    url: string,
    method: string,
    data: { [key: string]: string }
) => {
    const res = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(data)
    })
    const { msg, error }: ApiStatusResponse = await res.json()
    // TODO: remove this log when tested
    if (msg == 'new_token') console.log('refreshed token')
    msg == 'new_token'
        ? apiFetchSendCookie(url, method)
        : statusErrorHandler({ msg, error })
    return statusErrorHandler({ msg, error })
}

// export const apiFetchGetData = async (
//     url: string,
//     method: string,
//     data?: { [key: string]: number | string }
// ): Promise<{ [key: string]: number | string }> => {
//     const res = await fetch(url, {
//         method: method,
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         credentials: 'same-origin',
//         body: JSON.stringify(data)
//     })
//     const returnData = await res.json()
//     if (returnData.msg == 'new_token') {
//         return apiFetchGetData(url, method, data)
//     } else if (!returnData.error) return returnData
//     const { msg, error } = returnData
//     return statusErrorHandler({ msg, error })
// }
