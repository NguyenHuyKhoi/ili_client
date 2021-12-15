export const signupStart = () => ({
    type: 'SIGNUP_START'
})

export const signupSuccess = () => ({
    type: 'SIGNUP_SUCCESS'
})

export const signupFailure = (message) => ({
    type: 'SIGNUP_FAILURE',
    payload: {
        message
    }
})

export const loginStart = () => ({
    type: 'LOGIN_START'
})

export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
        user
    }
})

export const loginFailure = (message) => ({
    type: 'LOGIN_FAILURE',
    payload: {
        message
    }
})

export const logoutSuccess = () => ({
    type: 'LOGOUT'
})

