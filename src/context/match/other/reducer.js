
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
        case 'RESET_STATE': {
            return {
                ...state,
                isLoading: false,
                message: false,
                isSuccess: false
            }
        }

        default: 
            return state
    }
}

export default reducer