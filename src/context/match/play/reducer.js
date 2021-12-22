
const reducer = (state, action) => {
    const {match} = action.payload != undefined ? action.payload : {}
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
        case 'RESET_STATE': {
            return {
                ...state,
                isLoading: false,
                message: false,
                isSuccess: false
            }
        }

        case 'CREATE_MATCH_SUCCESS': {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                ...match
            }
        }
        default: 
            return state
    }
}

export default reducer