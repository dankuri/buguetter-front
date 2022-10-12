export const errors: { [key: number]: string } = {
    1: 'no login data in request',
    2: 'no user with this login',
    3: 'wrong password',
    4: 'this login is already taken',
    5: 'this name is already taken',
    6: 'no text in post',
    7: 'no refresh and/or access token',
    8: 'token modified elsewhere',
    9: 'token revoked',
    10: 'no tag in request body',
    11: 'no reaction in request body',
    12: 'adding post failed',
    13: 'db connection failed',
    14: 'likes and/or posts not found',
    15: 'no user with this name'
}

export const statusErrorHandler = ({ msg, error }: ApiStatusResponse) => {
    if (msg == 'success') {
        return 'success'
    } else if (error in errors) {
        return errors[error]
    } else if (error) {
        return 'unknown error'
    } else {
        return 'invalid response'
    }
}
