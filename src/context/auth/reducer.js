const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
            }
        case 'UPDATE_USER_INFOR': {
            return {
                ...state,
                user: {
                    accessToken: state.user.accessToken,
                    ...action.payload.user
                }
            }
        }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                user: null,
        }
        default: 
            return state
    }
}

export default reducer