import { catchNull } from './catchNull'
import { apiFetchSendCookie, apiFetchSendData } from './apiFetch'

const apiLogin = (loginData: { login: string; password: string }) => {
    return apiFetchSendData('/api/login', 'POST', loginData)
}

const apiLogout = () => {
    return apiFetchSendCookie('/api/logout', 'DELETE')
}

const apiRegister = (registerData: {
    name: string
    login: string
    password: string
}) => {
    return apiFetchSendData('/api/register', 'POST', registerData)
}

export const apiLoginCatching = catchNull(apiLogin)
export const apiLogoutCatching = catchNull(apiLogout)
export const apiRegisterCatching = catchNull(apiRegister)
