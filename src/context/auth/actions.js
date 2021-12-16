export const generateError = (error) => ({
    type: 'GENERATE_ERROR',
    payload: {
        error
    }
})

export const loading = () => ({
    type: 'LOADING'
})

export const signupSuccess = () => ({
    type: 'SIGNUP_SUCCESS'
})

export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
        user
    }
})

export const requestResetPasswordSuccess = (email) => ({
    type: 'REQUEST_RESET_PASSWORD_SUCCESS',
    payload: {
        email
    }
})

export const resetPasswordSuccess = () => ({
    type: 'RESET_PASSWORD_SUCCESS'
})


export const logoutSuccess = () => ({
    type: 'LOGOUT'
})

