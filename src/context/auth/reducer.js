const reducer = (state, action) => {
    const {user} = action.payload !== undefined ? action.payload : {}
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user,
            }
        case 'UPDATE_USER_INFOR': {
            console.log("Update user infor :", user)
            return {
                ...state,
                user: {
                    accessToken: state.user.accessToken,
                    ...user
                }
            }
        }
        case 'LOGOUT_SUCCESS':
            console.log("Set user to null")
            return {
                ...state,
                user: null,
        }

        default: 
            return state
    }
}

export default reducer