export const errors: { [key: number]: string } = {
    1: 'no login data in request',
    2: 'no user with this login',
    3: 'wrong password',
    4: 'this login is already taken',
    5: 'this name is already taken',
    6: 'db connection error',
    7: 'no text in post',
    8: 'no refresh and/or access token',
    9: 'token modified elsewhere',
    10: 'token revoked'
};

export const statusErrorHandler = ({ msg, error }: ApiResponse) => {
    if (msg == 'success') {
        return 'success';
    } else if (error in errors) {
        return errors[error];
    } else if (error) {
        return 'unknown error';
    } else {
        return 'invalid response';
    }
};
