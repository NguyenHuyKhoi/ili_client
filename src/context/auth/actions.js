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


export const logoutSuccess = (user) => ({
    type: 'LOGOUT_SUCCESS'
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

export const changePasswordSuccess = () => ({
    type: 'CHANGE_PASSWORD_SUCCESS'
})
