const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                isLoading: true,
                message: '',
                isSuccess: false
            }
        case 'GENERATE_ERROR':
            return {
                ...state,
                isLoading: false,
                message: action.payload.error,
                isSuccess: false
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                isLoading: false,
                message: "Login Sucessfully",
                isSuccess: true
            }

        case 'SIGNUP_SUCCESS': {
            return {
                ...state,
                isLoading: false,
                message: "Signup Successfully",
                isSuccess: true
            }
        }
        case 'REQUEST_RESET_PASSWORD_SUCCESS': {
            return {
                ...state,
                isLoading: false,
                isSuccess: true
            }
        }
        case 'RESET_PASSWORD_SUCCESS': {
            return {
                ...state,
                isLoading: false,
                isSuccess: true
            }
        }
        case 'LOGOUT':
            return {
                ...state
            }
        default: 
            return state
    }
}

export default reducer