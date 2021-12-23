
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
                message: '',
                isSuccess: false
            }
        }

        case 'CREATE_MATCH_SUCCESS': {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                match
            }
        }
        case 'JOIN_MATCH_SUCCESS': {
            console.log("Join match success: ", match)
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                message: 'Join game successfully',
                match
            }
        }
        case 'JOIN_MATCH_FAILURE': {
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                message: 'Pincode is wrong'
            }
        }
        case 'UPDATE_NAME_SUCCESS': {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                message: 'Update name successfully'
            }
        }
        case 'UPDATE_NAME_FAILURE': {
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                message: 'Update name failure'
            }
        }

        case 'LEAVE_MATCH_SUCCESS': {
            return {
                ...state,
                match: {},
                isLoading: false,
                isSuccess: true,
                message: 'Leave match successfully'
            }
        }
        case 'LEAVE_MATCH_FAILURE': {
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                message: 'Leave match failure'
            }
        }

        case 'UPDATE_MATCH': {
            console.log('Update match from server :', match)
            return {
                ...state,
                match
            }
        }
        default: 
            return state
    }
}

export default reducer