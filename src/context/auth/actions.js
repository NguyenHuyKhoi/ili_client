export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
        user
    }
})

export const updateUserInfor = (user) => ({
    type: 'UPDATE_USER_INFOR',
    payload: {
        user
    }
})

export const logoutSuccess = (user) => ({
    type: 'LOGOUT_SUCCESS'
})