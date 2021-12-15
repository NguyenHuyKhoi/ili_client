const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                isFetching: true,
                errMsg: ""
            }
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user,
                isFetching: false,
                errMsg: ""
            }
        case 'LOGIN_FAILURE':
            return {
                user: null,
                isFetching: false,
                errMsg: action.payload.message
            }
        case 'SIGNUP_START': {
            return {
                user: null,
                isFetching: true,
                errMsg: ""
            }
        }
        case 'SIGNUP_SUCCESS': {
            return {
                user: null,
                isFetching: false,
                errMsg: ""
            }
        }
        case 'SIGNUP_FAILURE': {
            return {
                user: null,
                isFetching: false,
                errMsg: action.payload.message
            }
        }
        case 'LOGOUT':
            console.log("Logout reducer")
            return {
                user: null,
                isFetching: false,
                error: false
            }
        default: 
            return state
    }
}

export default reducer